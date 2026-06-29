const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const { Card } = require('../Models')
const { uploadImageIfNeeded } = require('../Utils/imageStorage')

const SOCIAL_PLATFORMS = ['whatsapp', 'facebook', 'instagram', 'twitter', 'linkedin']

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.nextcommunicationeth.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
        user: process.env.SMTP_USER || 'info@nextcommunicationeth.com',
        pass: process.env.SMTP_PASS || '2909@info$2024',
    },
})

const normalizeSocialLinks = (links) => {
    const normalized = {}

    for (const platform of SOCIAL_PLATFORMS) {
        const value = links?.[platform]

        if (typeof value === 'string') {
            normalized[platform] = { enabled: !!value, url: value }
        } else if (value && typeof value === 'object') {
            normalized[platform] = {
                enabled: !!value.enabled,
                url: value.url || '',
            }
        } else {
            normalized[platform] = { enabled: false, url: '' }
        }
    }

    return normalized
}

const buildTheme = (body, existingTheme = {}) => {
    const theme = {
        primary_color: '#64748b',
        secondary_color: '#334155',
        ...existingTheme,
        ...(body.theme || {}),
    }

    if (body.primary_color) theme.primary_color = body.primary_color
    if (body.secondary_color) theme.secondary_color = body.secondary_color

    return theme
}

const formatCardResponse = (row) => {
    if (!row) return null

    const { password_hash, ...rest } = row
    const theme = buildTheme({ theme: rest.theme || {} })

    return {
        ...rest,
        id: rest.id,
        _id: rest.id,
        theme,
        primary_color: theme.primary_color,
        secondary_color: theme.secondary_color,
        social_links: normalizeSocialLinks(rest.social_links),
    }
}

const processNestedImages = async (items, imageKey) => {
    if (!Array.isArray(items)) return items || []

    return Promise.all(
        items.map(async (item) => ({
            ...item,
            [imageKey]: await uploadImageIfNeeded(item[imageKey]),
        }))
    )
}

const processCardImages = async (body, { isUpdate = false, existing = null } = {}) => {
    const imageFields = ['logo_url', 'profile_image_url', 'cover_url']
    const nestedFields = [
        ['services', 'icon_url'],
        ['gallery', 'image_url'],
        ['products', 'image_url'],
    ]

    const result = {}

    await Promise.all(
        imageFields.map(async (field) => {
            if (!isUpdate || body[field] !== undefined) {
                result[field] = await uploadImageIfNeeded(body[field])
            }
        })
    )

    await Promise.all(
        nestedFields.map(async ([field, imageKey]) => {
            if (!isUpdate || body[field] !== undefined) {
                result[field] = await processNestedImages(body[field], imageKey)
            }
        })
    )

    return {
        logo_url: result.logo_url ?? existing?.logo_url ?? '',
        profile_image_url: result.profile_image_url ?? existing?.profile_image_url ?? '',
        cover_url: result.cover_url ?? existing?.cover_url ?? '',
        services: result.services ?? existing?.services ?? [],
        gallery: result.gallery ?? existing?.gallery ?? [],
        products: result.products ?? existing?.products ?? [],
    }
}

const buildCardRecord = async (body, { existing = null, isUpdate = false } = {}) => {
    const images = await processCardImages(body, { isUpdate, existing })
    const theme = buildTheme(body, existing?.theme || {})
    const social_links = normalizeSocialLinks(body.social_links || existing?.social_links)

    const record = {
        slug: body.slug !== undefined ? String(body.slug).toUpperCase() : existing?.slug,
        card_type: body.card_type ?? existing?.card_type,
        business_name: body.business_name ?? existing?.business_name ?? '',
        full_name: body.full_name ?? existing?.full_name ?? '',
        job_title: body.job_title ?? existing?.job_title ?? '',
        company_name: body.company_name ?? existing?.company_name ?? '',
        tagline: body.tagline ?? existing?.tagline ?? '',
        description: body.description ?? existing?.description ?? '',
        logo_url: images.logo_url ?? existing?.logo_url ?? '',
        profile_image_url: images.profile_image_url ?? existing?.profile_image_url ?? '',
        cover_url: images.cover_url ?? existing?.cover_url ?? '',
        email: body.email ?? existing?.email ?? '',
        phone: body.phone ?? existing?.phone ?? '',
        website: body.website ?? existing?.website ?? '',
        address: body.address ?? existing?.address ?? '',
        is_password_protected:
            body.is_password_protected ?? existing?.is_password_protected ?? false,
        theme,
        services: images.services ?? existing?.services ?? [],
        gallery: images.gallery ?? existing?.gallery ?? [],
        products: images.products ?? existing?.products ?? [],
        business_hours: body.business_hours ?? existing?.business_hours ?? [],
        social_links,
    }

    const wantsProtection = record.is_password_protected

    if (!isUpdate && wantsProtection && body.password) {
        record.password_hash = await bcrypt.hash(body.password, 12)
    } else if (isUpdate) {
        if (body.password) {
            record.password_hash = await bcrypt.hash(body.password, 12)
        } else if (body.is_password_protected === false) {
            record.password_hash = null
        } else if (existing?.password_hash) {
            record.password_hash = existing.password_hash
        }
    } else if (!wantsProtection) {
        record.password_hash = null
    }

    return record
}

const isNotFoundError = (err) =>
    err?.code === 'PGRST116' || err?.message?.includes('0 rows')

exports.getCards = async (req, res) => {
    try {
        const rows = await Card.findAll()
        res.status(200).json({
            cards: rows.map(formatCardResponse),
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

exports.getCardBySlug = async (req, res) => {
    try {
        const row = await Card.findBySlug(req.params.slug)

        if (row.is_password_protected) {
            const headerPassword = req.headers['x-card-password']

            if (!headerPassword) {
                return res.status(401).json({
                    message: 'Password required',
                })
            }

            const valid = await bcrypt.compare(headerPassword, row.password_hash || '')

            if (!valid) {
                return res.status(403).json({
                    message: 'Invalid password',
                })
            }
        }

        res.status(200).json({
            card: formatCardResponse(row),
        })
    } catch (err) {
        if (isNotFoundError(err)) {
            return res.status(404).json({
                message: 'Card not found',
            })
        }

        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

exports.createCard = async (req, res) => {
    try {
        const slug = String(req.body.slug || '').toUpperCase()

        if (!slug) {
            return res.status(400).json({
                success: false,
                message: 'slug is required',
            })
        }

        if (!req.body.card_type) {
            return res.status(400).json({
                success: false,
                message: 'card_type is required',
            })
        }

        if (await Card.slugExists(slug)) {
            return res.status(409).json({
                success: false,
                message: 'slug already exists',
            })
        }

        if (req.body.is_password_protected && !req.body.password) {
            return res.status(400).json({
                success: false,
                message: 'password is required when card is password protected',
            })
        }

        const record = await buildCardRecord({ ...req.body, slug })
        const created = await Card.create(record)

        res.status(201).json({
            success: true,
            card: formatCardResponse(created),
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

exports.updateCard = async (req, res) => {
    try {
        const id = req.params.id
        const existing = await Card.findById(id)

        if (req.body.slug) {
            const slug = String(req.body.slug).toUpperCase()

            if (await Card.slugExists(slug, id)) {
                return res.status(409).json({
                    success: false,
                    message: 'slug already exists',
                })
            }
        }

        const record = await buildCardRecord(req.body, { existing, isUpdate: true })
        const updated = await Card.update(id, record)

        res.status(200).json({
            success: true,
            card: formatCardResponse(updated),
        })
    } catch (err) {
        if (isNotFoundError(err)) {
            return res.status(404).json({
                success: false,
                message: 'Card not found',
            })
        }

        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

exports.deleteCard = async (req, res) => {
    try {
        await Card.delete(req.params.id)

        res.status(200).json({
            success: true,
        })
    } catch (err) {
        if (isNotFoundError(err)) {
            return res.status(404).json({
                success: false,
                message: 'Card not found',
            })
        }

        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

exports.verifyPassword = async (req, res) => {
    try {
        const row = await Card.findBySlug(req.params.slug)
        const { password } = req.body

        if (!row.is_password_protected) {
            return res.status(200).json({ success: true })
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'password is required',
            })
        }

        const valid = await bcrypt.compare(password, row.password_hash || '')

        if (!valid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password',
            })
        }

        res.status(200).json({ success: true })
    } catch (err) {
        if (isNotFoundError(err)) {
            return res.status(404).json({
                success: false,
                message: 'Card not found',
            })
        }

        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

exports.sendInquiry = async (req, res) => {
    try {
        const row = await Card.findBySlug(req.params.slug)
        const { name, email, phone, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'name, email, and message are required',
            })
        }

        const cardLabel = row.business_name || row.full_name || row.slug
        const recipient =
            row.email ||
            process.env.CONTACT_EMAIL_TO ||
            'christian@nextcommunicationeth.com'

        const mailOptions = {
            from: process.env.SMTP_USER || 'info@nextcommunicationeth.com',
            to: recipient,
            replyTo: email,
            subject: `Digital card inquiry — ${cardLabel}`,
            text: [
                `New inquiry for card: ${cardLabel} (${row.slug})`,
                '',
                `Name: ${name}`,
                `Email: ${email}`,
                `Phone: ${phone || 'N/A'}`,
                '',
                `Message:`,
                message,
            ].join('\n'),
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({ success: true })
    } catch (err) {
        if (isNotFoundError(err)) {
            return res.status(404).json({
                success: false,
                message: 'Card not found',
            })
        }

        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
