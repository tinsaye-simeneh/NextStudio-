const crypto = require('crypto')
const supabase = require('../Config/database')

/**
 * CARD_IMAGE_STORAGE — `supabase` (default) | `cloudinary` | `inline`
 *
 * supabase  — upload base64 to Supabase Storage (requires SUPABASE_STORAGE_BUCKET)
 * cloudinary — upload via Cloudinary (requires preset / credentials)
 * inline    — store base64 data URLs as-is (no external storage)
 */
const PROVIDER = (
    process.env.CARD_IMAGE_STORAGE ||
    process.env.IMAGE_STORAGE ||
    'supabase'
).toLowerCase()

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'card-images'

const isBase64DataUrl = (value) =>
    typeof value === 'string' && value.startsWith('data:')

const parseDataUrl = (dataUrl) => {
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/)

    if (!match) {
        throw new Error('Invalid base64 data URL')
    }

    const mime = match[1]
    const buffer = Buffer.from(match[2], 'base64')
    const ext = mime.split('/')[1]?.replace('jpeg', 'jpg') || 'bin'

    return { mime, buffer, ext }
}

const uploadToSupabase = async (dataUrl) => {
    const { mime, buffer, ext } = parseDataUrl(dataUrl)
    const fileName = `cards/${crypto.randomUUID()}.${ext}`

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, buffer, {
            contentType: mime,
            upsert: false,
        })

    if (error) throw error

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
    return data.publicUrl
}

const uploadToCloudinary = async (dataUrl) => {
    const cloudinary = require('./cloudinary')
    const result = await cloudinary.uploader.upload(dataUrl, {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || 'NextCard',
    })

    return result.secure_url
}

const uploadImageIfNeeded = async (value) => {
    if (!value || !isBase64DataUrl(value)) {
        return value
    }

    switch (PROVIDER) {
        case 'cloudinary':
            return uploadToCloudinary(value)
        case 'inline':
            return value
        case 'supabase':
        default:
            return uploadToSupabase(value)
    }
}

module.exports = {
    PROVIDER,
    uploadImageIfNeeded,
}
