import { useEffect, useState } from "react";
import { message, Modal, Spin, Tabs } from "antd";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";
import { URL } from "../../../Url/Url";
import {
  createDefaultBusinessHours,
  createEmptyCard,
  getCardDisplayName,
  readFileAsDataUrl,
  slugify,
} from "./cardAdminDefaults";
import {
  SOCIAL_PLATFORMS,
  normalizeSocialLinks,
} from "../../../Clients/Components/Card Component/cardUtils";

const authConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const AdminCardManagement = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState(createEmptyCard());

  const fetchCards = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/NextStudio/cards`);
      setCards(data.cards || []);
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to load cards");
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const openCreate = () => {
    setSelectedCard(null);
    setFormData(createEmptyCard());
    setShowModal(true);
  };

  const openEdit = (card) => {
    setSelectedCard(card);
    setFormData({
      ...createEmptyCard(),
      ...card,
      theme: { ...createEmptyCard().theme, ...(card.theme || {}) },
      social_links: normalizeSocialLinks(card.social_links),
      services: card.services || [],
      gallery: card.gallery || [],
      products: card.products || [],
      business_hours: card.business_hours?.length
        ? card.business_hours
        : createDefaultBusinessHours(),
      password: "",
    });
    setShowModal(true);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateTheme = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      theme: { ...prev.theme, [field]: value },
    }));
  };

  const updateSocial = (platform, field, value) => {
    setFormData((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: {
          ...prev.social_links[platform],
          [field]: value,
        },
      },
    }));
  };

  const updateListItem = (listName, index, field, value) => {
    setFormData((prev) => {
      const list = [...prev[listName]];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [listName]: list };
    });
  };

  const addListItem = (listName, item) => {
    setFormData((prev) => ({
      ...prev,
      [listName]: [...prev[listName], item],
    }));
  };

  const removeListItem = (listName, index) => {
    setFormData((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e, field, listName, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    if (listName != null) {
      updateListItem(listName, index, field, dataUrl);
    } else {
      updateField(field, dataUrl);
    }
    e.target.value = "";
  };

  const validateForm = () => {
    if (!formData.slug?.trim()) {
      message.error("Slug is required");
      return false;
    }
    if (formData.card_type === "business" && !formData.business_name?.trim()) {
      message.error("Business name is required");
      return false;
    }
    if (formData.card_type === "personal" && !formData.full_name?.trim()) {
      message.error("Full name is required");
      return false;
    }
    if (formData.is_password_protected && !selectedCard && !formData.password?.trim()) {
      message.error("Password is required for protected cards");
      return false;
    }

    const invalidSocial = SOCIAL_PLATFORMS.find(({ key, label }) => {
      const entry = formData.social_links[key];
      return entry?.enabled && !entry?.url?.trim();
    });

    if (invalidSocial) {
      message.error(`Please add a URL for ${invalidSocial.label} or disable it`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    try {
      const payload = {
        ...formData,
        slug: slugify(formData.slug),
      };
      if (!payload.password) delete payload.password;

      const cardId = selectedCard?._id || selectedCard?.id;

      if (selectedCard && cardId) {
        const { data } = await axios.patch(
          `${URL}/api/NextStudio/cards/${cardId}`,
          payload,
          authConfig()
        );
        if (data.success !== false) {
          message.success("Card updated successfully");
          setShowModal(false);
          fetchCards();
        }
      } else {
        const { data } = await axios.post(
          `${URL}/api/NextStudio/cards`,
          payload,
          authConfig()
        );
        if (data.success !== false) {
          message.success("Card created successfully");
          setShowModal(false);
          fetchCards();
        }
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to save card");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const { data } = await axios.delete(
        `${URL}/api/NextStudio/cards/${deleteId}`,
        authConfig()
      );
      if (data.success !== false) {
        message.success("Card deleted successfully");
        setShowDeleteModal(false);
        setDeleteId(null);
        fetchCards();
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to delete card");
    } finally {
      setDeleting(false);
    }
  };

  const inputClass = "cinput w-full !mr-0 box-border";
  const labelClass = "font-semibold uppercase text-sm";

  const basicTab = (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Card Type</label>
          <select
            className={inputClass}
            value={formData.card_type}
            onChange={(e) => updateField("card_type", e.target.value)}
          >
            <option value="business">Business</option>
            <option value="personal">Personal</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Slug (URL)</label>
          <input
            className={inputClass}
            value={formData.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            placeholder="AYAN-FITNESS"
          />
          <p className="text-xs text-gray-500">/cards/{slugify(formData.slug) || "your-slug"}</p>
        </div>
      </div>

      {formData.card_type === "business" ? (
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Business Name *</label>
          <input
            className={inputClass}
            value={formData.business_name}
            onChange={(e) => updateField("business_name", e.target.value)}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Full Name *</label>
            <input
              className={inputClass}
              value={formData.full_name}
              onChange={(e) => updateField("full_name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Job Title</label>
              <input
                className={inputClass}
                value={formData.job_title}
                onChange={(e) => updateField("job_title", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Company</label>
              <input
                className={inputClass}
                value={formData.company_name}
                onChange={(e) => updateField("company_name", e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Tagline</label>
        <input
          className={inputClass}
          value={formData.tagline}
          onChange={(e) => updateField("tagline", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Description</label>
        <textarea
          className="ctextarea w-full !mr-0 box-border"
          rows={4}
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Email</label>
          <input className={inputClass} value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Phone</label>
          <input className={inputClass} value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Website</label>
          <input className={inputClass} value={formData.website} onChange={(e) => updateField("website", e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Address</label>
        <textarea className="ctextarea w-full !mr-0 box-border" rows={2} value={formData.address} onChange={(e) => updateField("address", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Primary Color</label>
          <input className={inputClass} type="color" value={formData.theme.primary_color} onChange={(e) => updateTheme("primary_color", e.target.value)} />
          <p className="text-xs text-gray-500">Saved to backend and used across the card page</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Secondary Color</label>
          <input className={inputClass} type="color" value={formData.theme.secondary_color} onChange={(e) => updateTheme("secondary_color", e.target.value)} />
          <p className="text-xs text-gray-500">Hero gradient, buttons, and accents</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Logo / Profile Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, formData.card_type === "personal" ? "profile_image_url" : "logo_url")} />
          {(formData.logo_url || formData.profile_image_url) && (
            <img src={formData.profile_image_url || formData.logo_url} alt="" className="h-20 w-20 rounded object-cover" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Cover Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "cover_url")} />
          {formData.cover_url && <img src={formData.cover_url} alt="" className="h-20 w-full rounded object-cover" />}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.is_password_protected}
          onChange={(e) => updateField("is_password_protected", e.target.checked)}
        />
        <label className={labelClass}>Password Protected</label>
      </div>
      {formData.is_password_protected && (
        <div className="flex flex-col gap-2">
          <label className={labelClass}>{selectedCard ? "New Password (optional)" : "Password *"}</label>
          <input
            type="password"
            className={inputClass}
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
          />
        </div>
      )}
    </div>
  );

  const servicesTab = (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <button
        type="button"
        className="bg-Secondary text-white px-4 py-2 rounded"
        onClick={() => addListItem("services", { title: "", description: "", icon_url: "" })}
      >
        Add Service
      </button>
      {formData.services.map((service, index) => (
        <div key={index} className="border rounded p-4 space-y-3">
          <input className={inputClass} placeholder="Title" value={service.title} onChange={(e) => updateListItem("services", index, "title", e.target.value)} />
          <textarea className="ctextarea w-full !mr-0" rows={2} placeholder="Description" value={service.description} onChange={(e) => updateListItem("services", index, "description", e.target.value)} />
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "icon_url", "services", index)} />
          <button type="button" className="text-red-500" onClick={() => removeListItem("services", index)}>Remove</button>
        </div>
      ))}
    </div>
  );

  const galleryTab = (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <button type="button" className="bg-Secondary text-white px-4 py-2 rounded" onClick={() => addListItem("gallery", { image_url: "", caption: "" })}>
        Add Image
      </button>
      {formData.gallery.map((item, index) => (
        <div key={index} className="border rounded p-4 space-y-3">
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "image_url", "gallery", index)} />
          {item.image_url && <img src={item.image_url} alt="" className="h-24 w-24 rounded object-cover" />}
          <input className={inputClass} placeholder="Caption" value={item.caption} onChange={(e) => updateListItem("gallery", index, "caption", e.target.value)} />
          <button type="button" className="text-red-500" onClick={() => removeListItem("gallery", index)}>Remove</button>
        </div>
      ))}
    </div>
  );

  const productsTab = (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <button type="button" className="bg-Secondary text-white px-4 py-2 rounded" onClick={() => addListItem("products", { name: "", description: "", price: "", currency: "ETB", image_url: "" })}>
        Add Product
      </button>
      {formData.products.map((product, index) => (
        <div key={index} className="border rounded p-4 space-y-3">
          <input className={inputClass} placeholder="Name" value={product.name} onChange={(e) => updateListItem("products", index, "name", e.target.value)} />
          <textarea className="ctextarea w-full !mr-0" rows={2} placeholder="Description" value={product.description} onChange={(e) => updateListItem("products", index, "description", e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <input className={inputClass} placeholder="Price" type="number" value={product.price} onChange={(e) => updateListItem("products", index, "price", e.target.value)} />
            <input className={inputClass} placeholder="Currency" value={product.currency} onChange={(e) => updateListItem("products", index, "currency", e.target.value)} />
          </div>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "image_url", "products", index)} />
          <button type="button" className="text-red-500" onClick={() => removeListItem("products", index)}>Remove</button>
        </div>
      ))}
    </div>
  );

  const hoursTab = (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
      {formData.business_hours.map((entry, index) => (
        <div key={entry.day} className="grid grid-cols-4 gap-3 items-center border rounded p-3">
          <span className="font-medium">{entry.day}</span>
          <input className={inputClass} placeholder="Open" value={entry.open || ""} disabled={entry.is_closed} onChange={(e) => updateListItem("business_hours", index, "open", e.target.value)} />
          <input className={inputClass} placeholder="Close" value={entry.close || ""} disabled={entry.is_closed} onChange={(e) => updateListItem("business_hours", index, "close", e.target.value)} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={entry.is_closed} onChange={(e) => updateListItem("business_hours", index, "is_closed", e.target.checked)} />
            Closed
          </label>
        </div>
      ))}
    </div>
  );

  const socialTab = (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <p className="text-sm text-gray-500">
        Enable each platform and add its link. Only enabled links appear on the card.
      </p>
      {SOCIAL_PLATFORMS.map(({ key, label }) => {
        const entry = formData.social_links[key] || { enabled: false, url: "" };

        return (
          <div key={key} className="rounded border p-4 space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={entry.enabled}
                onChange={(e) => updateSocial(key, "enabled", e.target.checked)}
              />
              <span className={labelClass}>{label}</span>
            </label>
            {entry.enabled && (
              <input
                className={inputClass}
                value={entry.url}
                onChange={(e) => updateSocial(key, "url", e.target.value)}
                placeholder={
                  key === "whatsapp"
                    ? "https://wa.me/251911223344"
                    : `https://${key}.com/your-profile`
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="flex justify-end">
        <button className="bg-Secondary text-white w-[200px] py-2 px-5 rounded" onClick={openCreate}>
          Add Card
        </button>
      </div>

      <hr className="mt-5 mb-5" />

      {loading ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : cards.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No cards yet. Create your first digital card.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cards.map((card) => {
            const cardId = card._id || card.id;
            return (
              <div key={cardId || card.slug} className="flex items-center justify-between border rounded-lg p-4">
                <div>
                  <h2 className="text-lg font-semibold">{getCardDisplayName(card)}</h2>
                  <p className="text-sm text-gray-500 capitalize">{card.card_type || "business"} card</p>
                  <p className="text-sm text-Primary">/cards/{card.slug}</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`/cards/${card.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-Secondary hover:underline"
                  >
                    <FaExternalLinkAlt /> Preview
                  </a>
                  <button className="bg-Secondary text-white px-4 py-2 rounded" onClick={() => openEdit(card)}>
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setDeleteId(cardId);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={showModal}
        footer={null}
        width={900}
        closable={!saving}
        onCancel={() => !saving && setShowModal(false)}
        destroyOnClose
      >
        <h1 className="text-center text-xl uppercase font-semibold mb-4">
          {selectedCard ? "Edit Card" : "Add Card"}
        </h1>
        <form onSubmit={handleSubmit}>
          <Tabs
            items={[
              { key: "1", label: "Basic Info", children: basicTab },
              { key: "2", label: "Services", children: servicesTab },
              { key: "3", label: "Gallery", children: galleryTab },
              { key: "4", label: "Products", children: productsTab },
              { key: "5", label: "Business Hours", children: hoursTab },
              { key: "6", label: "Social Links", children: socialTab },
            ]}
          />
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-Secondary text-white px-6 py-2 rounded flex items-center gap-2" disabled={saving}>
              {saving ? <><Spin size="small" /> Saving...</> : selectedCard ? "Update Card" : "Create Card"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={showDeleteModal}
        footer={null}
        centered
        closable={!deleting}
        onCancel={() => !deleting && setShowDeleteModal(false)}
      >
        <h1 className="text-center text-2xl">Delete this card?</h1>
        <div className="flex justify-center gap-5 mt-5">
          <button className="bg-red-500 text-white px-5 py-2 rounded" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
          <button className="bg-gray-400 text-white px-5 py-2 rounded" onClick={() => setShowDeleteModal(false)} disabled={deleting}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminCardManagement;
