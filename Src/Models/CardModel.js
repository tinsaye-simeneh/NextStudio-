class CardModel {
    constructor(supabase) {
        this.supabase = supabase
    }

    async create(cardData) {
        const { data, error } = await this.supabase
            .from('cards')
            .insert([cardData])
            .select()

        if (error) throw error
        return data[0]
    }

    async findAll() {
        const { data, error } = await this.supabase
            .from('cards')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    async findById(id) {
        const { data, error } = await this.supabase
            .from('cards')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    }

    async findBySlug(slug) {
        const { data, error } = await this.supabase
            .from('cards')
            .select('*')
            .ilike('slug', slug)
            .single()

        if (error) throw error
        return data
    }

    async slugExists(slug, excludeId = null) {
        let query = this.supabase
            .from('cards')
            .select('id')
            .ilike('slug', slug)

        if (excludeId) {
            query = query.neq('id', excludeId)
        }

        const { data, error } = await query

        if (error) throw error
        return data.length > 0
    }

    async update(id, updateData) {
        const allowed = [
            'slug', 'card_type', 'business_name', 'full_name', 'job_title', 'company_name',
            'tagline', 'description', 'logo_url', 'profile_image_url', 'cover_url',
            'email', 'phone', 'website', 'address', 'is_password_protected', 'password_hash',
            'theme', 'services', 'gallery', 'products', 'business_hours', 'social_links',
            'primary_color', 'secondary_color'
        ]

        const updateObj = { updated_at: new Date().toISOString() }

        for (const key of allowed) {
            if (updateData[key] !== undefined) {
                updateObj[key] = updateData[key]
            }
        }

        const { data, error } = await this.supabase
            .from('cards')
            .update(updateObj)
            .eq('id', id)
            .select()

        if (error) throw error
        return data[0]
    }

    async delete(id) {
        const { error } = await this.supabase
            .from('cards')
            .delete()
            .eq('id', id)

        if (error) throw error
        return true
    }
}

module.exports = CardModel
