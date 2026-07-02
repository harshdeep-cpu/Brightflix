import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const emptyForm = {
  name: '', price: '', originalPrice: '', category: '', subcategory: '',
  description: '', badge: '', rating: '', stock: '',
  featured: false, image: '', images: [], video: '',
};

const Admin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Product state
  const [products, setProducts] = useState([]);
  const [form, setForm]         = useState(emptyForm);
  const [editId, setEditId]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState('');

  // Category state
  const [categories, setCategories]     = useState([]);
  const [catForm, setCatForm]           = useState({ name: '', icon: '📦', order: 0 });
  const [editCatId, setEditCatId]       = useState(null);
  const [catMsg, setCatMsg]             = useState('');

  // Subcategory state
  const [subOptions, setSubOptions]               = useState([]);
  const [selectedCatForSub, setSelectedCatForSub] = useState(null);
  const [subForm, setSubForm]                     = useState({ name: '', icon: '📦', order: 0 });
  const [editSubId, setEditSubId]                 = useState(null);

  // Upload state
  const [imageFiles, setImageFiles]     = useState([]);
  const [videoFile, setVideoFile]       = useState(null);
  const [previews, setPreviews]         = useState([]);
  const [videoPreview, setVideoPreview] = useState('');
  const [uploading, setUploading]       = useState(false);

  // ── Fetch functions ──
  const fetchProducts = async () => {
    try {
      const res  = await fetch('https://brightflix.onrender.com/api/products');
      const data = await res.json();
      setProducts(data.products || data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res  = await fetch('https://brightflix.onrender.com/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  // ── Effects ──
  useEffect(() => {
    if (!user?.isAdmin) { navigate('/'); return; }
    fetchProducts();
    fetchCategories();
  }, []);

  // 👇 Update subcategory options when category changes in product form
  useEffect(() => {
    if (form.category) {
      const cat = categories.find(c => c.name === form.category);
      setSubOptions(cat?.subcategories || []);
      setForm(f => ({ ...f, subcategory: '' }));
    } else {
      setSubOptions([]);
    }
  }, [form.category, categories]);

  // ── Upload handlers ──
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const uploadFiles = async () => {
    let imageUrls = form.images || [];
    let videoUrl  = form.video  || '';
    setUploading(true);
    try {
      if (imageFiles.length > 0) {
        const fd = new FormData();
        imageFiles.forEach(f => fd.append('images', f));
        const res  = await fetch('https://brightflix.onrender.com/api/upload/images', {
          method: 'POST',
          headers: { Authorization: `Bearer ${user.token}` },
          body: fd,
        });
        const data = await res.json();
        imageUrls  = data.urls;
      }
      if (videoFile) {
        const fd = new FormData();
        fd.append('video', videoFile);
        const res  = await fetch('https://brightflix.onrender.com/api/upload/video', {
          method: 'POST',
          headers: { Authorization: `Bearer ${user.token}` },
          body: fd,
        });
        const data = await res.json();
        videoUrl   = data.url;
      }
    } finally {
      setUploading(false);
    }
    return { imageUrls, videoUrl };
  };

  // ── Product handlers ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { imageUrls, videoUrl } = await uploadFiles();
      const productData = {
        ...form,
        images: imageUrls,
        image:  imageUrls[0] || form.image,
        video:  videoUrl,
      };
      const url    = editId ? `https://brightflix.onrender.com/api/products/${editId}` : 'https://brightflix.onrender.com/api/products';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error('Failed to save product');
      setMsg(editId ? '✅ Product updated!' : '✅ Product added!');
      setForm(emptyForm);
      setEditId(null);
      setImageFiles([]);
      setVideoFile(null);
      setPreviews([]);
      setVideoPreview('');
      fetchProducts();
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const handleEdit = (p) => {
    setForm({ ...p, subcategory: p.subcategory || '' });
    setEditId(p._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await fetch(`https://brightflix.onrender.com/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchProducts();
  };

  // ── Category handlers ──
  const handleCatSubmit = async (e) => {
    e.preventDefault();
    try {
      const url    = editCatId ? `https://brightflix.onrender.com/api/categories/${editCatId}` : 'https://brightflix.onrender.com/api/categories';
      const method = editCatId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(catForm),
      });
      if (!res.ok) throw new Error('Failed');
      setCatMsg(editCatId ? '✅ Category updated!' : '✅ Category added!');
      setCatForm({ name: '', icon: '📦', order: 0 });
      setEditCatId(null);
      fetchCategories();
    } catch {
      setCatMsg('❌ Failed to save category');
    } finally {
      setTimeout(() => setCatMsg(''), 3000);
    }
  };

  const handleCatDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    await fetch(`https://brightflix.onrender.com/api/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchCategories();
  };

  // ── Subcategory handlers ──
  const handleSubAdd = async (catId) => {
    if (!subForm.name) return;
    try {
      const url    = editSubId
        ? `https://brightflix.onrender.com/api/categories/${catId}/subcategories/${editSubId}`
        : `https://brightflix.onrender.com/api/categories/${catId}/subcategories`;
      const method = editSubId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(subForm),
      });
      if (!res.ok) throw new Error('Failed');
      setCatMsg('✅ Subcategory saved!');
      setSubForm({ name: '', icon: '📦', order: 0 });
      setEditSubId(null);
      setSelectedCatForSub(null);
      fetchCategories();
    } catch {
      setCatMsg('❌ Failed to save subcategory');
    } finally {
      setTimeout(() => setCatMsg(''), 3000);
    }
  };

  const handleSubDelete = async (catId, subId) => {
    if (!window.confirm('Delete this subcategory?')) return;
    await fetch(`https://brightflix.onrender.com/api/categories/${catId}/subcategories/${subId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchCategories();
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1 className="admin-title">🛠 Admin Panel</h1>

        {/* ── ADD / EDIT PRODUCT FORM ── */}
        <div className="admin-form-card">
          <h2>{editId ? 'Edit Product' : 'Add New Product'}</h2>
          {msg && <div className="admin-msg">{msg}</div>}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="admin-field">
                <label>Product Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required placeholder="e.g. 4K Smart TV 55inch"
                />
              </div>

              {/* Category dropdown */}
              <div className="admin-field">
                <label>Category *</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 👇 Subcategory dropdown — auto-populates when category selected */}
              <div className="admin-field">
                <label>Subcategory</label>
                <select
                  value={form.subcategory}
                  onChange={e => setForm({ ...form, subcategory: e.target.value })}
                  disabled={subOptions.length === 0}
                >
                  <option value="">
                    {subOptions.length === 0 ? '— select category first —' : 'Select subcategory'}
                  </option>
                  {subOptions.map(sub => (
                    <option key={sub._id} value={sub.name}>
                      {sub.icon} {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="admin-field">
                <label>Price (₹) *</label>
                <input
                  type="number" value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  required placeholder="45999"
                />
              </div>
              <div className="admin-field">
                <label>Original Price (₹)</label>
                <input
                  type="number" value={form.originalPrice}
                  onChange={e => setForm({ ...form, originalPrice: e.target.value })}
                  placeholder="65000"
                />
              </div>
              <div className="admin-field">
                <label>Stock</label>
                <input
                  type="number" value={form.stock}
                  onChange={e => setForm({ ...form, stock: e.target.value })}
                  placeholder="50"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="admin-field">
                <label>Badge</label>
                <select value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })}>
                  <option value="">None</option>
                  <option>Hot</option>
                  <option>New</option>
                  <option>Best Seller</option>
                </select>
              </div>
              <div className="admin-field">
                <label>Rating (0-5)</label>
                <input
                  type="number" min="0" max="5" step="0.1"
                  value={form.rating}
                  onChange={e => setForm({ ...form, rating: e.target.value })}
                  placeholder="4.5"
                />
              </div>
              <div className="admin-field admin-check">
                <label>
                  <input
                    type="checkbox" checked={form.featured}
                    onChange={e => setForm({ ...form, featured: e.target.checked })}
                  />
                  Featured Product
                </label>
              </div>
            </div>

            <div className="admin-field">
              <label>Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3} placeholder="Product description..."
              />
            </div>

            {/* Images Upload */}
            <div className="admin-field">
              <label>Product Images (up to 6)</label>
              <div className="upload-box" onClick={() => document.getElementById('img-upload').click()}>
                <span>📁</span>
                <p>Click to select images</p>
                <small>JPG, PNG, WEBP — up to 6 photos</small>
                <input
                  id="img-upload" type="file" accept="image/*" multiple
                  style={{ display: 'none' }} onChange={handleImageChange}
                />
              </div>
              {previews.length > 0 && (
                <div className="img-previews">
                  {previews.map((url, i) => (
                    <div key={i} className="img-preview-wrap">
                      <img src={url} alt={`preview-${i}`} />
                      {i === 0 && <span className="main-badge">Main</span>}
                      <button className="remove-img-btn" onClick={() => {
                        setPreviews(prev => prev.filter((_, idx) => idx !== i));
                        setImageFiles(prev => prev.filter((_, idx) => idx !== i));
                      }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
              {editId && form.images?.length > 0 && previews.length === 0 && (
                <div className="img-previews">
                  {form.images.map((url, i) => (
                    <div key={i} className="img-preview-wrap">
                      <img src={url} alt={`existing-${i}`} />
                      {i === 0 && <span className="main-badge">Main</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video Upload */}
            <div className="admin-field">
              <label>Product Video (mp4/webm, max 100MB)</label>
              <div className="upload-box" onClick={() => document.getElementById('vid-upload').click()}>
                <span>🎬</span>
                <p>Click to select video</p>
                <small>MP4 or WEBM format</small>
                <input
                  id="vid-upload" type="file" accept="video/mp4,video/webm"
                  style={{ display: 'none' }} onChange={handleVideoChange}
                />
              </div>
              {videoPreview && (
                <div style={{ marginTop: 12, position: 'relative' }}>
                  <video src={videoPreview} controls className="video-preview" />
                  <button className="remove-img-btn"
                    style={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => { setVideoFile(null); setVideoPreview(''); }}>✕</button>
                </div>
              )}
              {editId && form.video && !videoPreview && (
                <video src={form.video} controls className="video-preview" style={{ marginTop: 12 }} />
              )}
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="btn-primary" disabled={loading || uploading}>
                {loading || uploading ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
              </button>
              {editId && (
                <button type="button" className="btn-outline"
                  onClick={() => { setForm(emptyForm); setEditId(null); setPreviews([]); setVideoPreview(''); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── PRODUCT TABLE ── */}
        <div className="admin-table-card">
          <h2>All Products ({products.length})</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.subcategory || '—'}</td>
                    <td>₹{p.price?.toLocaleString('en-IN')}</td>
                    <td>{p.stock ?? '-'}</td>
                    <td>{p.featured ? '✅' : '—'}</td>
                    <td>
                      <button className="edit-btn"   onClick={() => handleEdit(p)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── CATEGORY & SUBCATEGORY MANAGEMENT ── */}
        <div className="admin-form-card">
          <h2>📂 Manage Categories & Subcategories</h2>
          {catMsg && <div className="admin-msg">{catMsg}</div>}

          <h3 className="admin-sub-title">{editCatId ? 'Edit Category' : 'Add Category'}</h3>
          <form onSubmit={handleCatSubmit} className="admin-form">
            <div className="form-row">
              <div className="admin-field">
                <label>Category Name *</label>
                <input
                  value={catForm.name}
                  onChange={e => setCatForm({ ...catForm, name: e.target.value })}
                  required placeholder="e.g. Solar"
                />
              </div>
              <div className="admin-field">
                <label>Icon (emoji)</label>
                <input
                  value={catForm.icon}
                  onChange={e => setCatForm({ ...catForm, icon: e.target.value })}
                  placeholder="☀️"
                />
              </div>
              <div className="admin-field">
                <label>Display Order</label>
                <input
                  type="number" value={catForm.order}
                  onChange={e => setCatForm({ ...catForm, order: e.target.value })}
                  placeholder="1"
                />
              </div>
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="btn-primary">
                {editCatId ? 'Update Category' : 'Add Category'}
              </button>
              {editCatId && (
                <button type="button" className="btn-outline"
                  onClick={() => { setCatForm({ name: '', icon: '📦', order: 0 }); setEditCatId(null); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Category list with subcategories */}
          <div className="cat-manage-list" style={{ marginTop: 24 }}>
            {categories.map(cat => (
              <div key={cat._id} className="cat-manage-item-wrap">

                {/* Category row */}
                <div className="cat-manage-item">
                  <span className="cat-manage-icon">{cat.icon}</span>
                  <span className="cat-manage-name">{cat.name}</span>
                  <span className="cat-sub-count">
                    {cat.subcategories?.length || 0} subcategories
                  </span>
                  <div className="cat-manage-actions">
                    <button className="edit-btn" onClick={() => {
                      setCatForm({ name: cat.name, icon: cat.icon, order: cat.order });
                      setEditCatId(cat._id);
                      setSelectedCatForSub(null);
                    }}>Edit</button>
                    <button className="add-sub-btn" onClick={() =>
                      setSelectedCatForSub(selectedCatForSub === cat._id ? null : cat._id)
                    }>
                      {selectedCatForSub === cat._id ? 'Close ✕' : '+ Sub'}
                    </button>
                    <button className="delete-btn" onClick={() => handleCatDelete(cat._id)}>Delete</button>
                  </div>
                </div>

                {/* Subcategory add/edit inline form */}
                {selectedCatForSub === cat._id && (
                  <div className="sub-add-form">
                    <h4>{editSubId ? 'Edit Subcategory' : `Add Subcategory to "${cat.name}"`}</h4>
                    <div className="form-row">
                      <div className="admin-field">
                        <label>Subcategory Name *</label>
                        <input
                          value={subForm.name}
                          onChange={e => setSubForm({ ...subForm, name: e.target.value })}
                          placeholder="e.g. Solar Panels"
                        />
                      </div>
                      {/* <div className="admin-field">
                        <label>Icon</label>
                        <input
                          value={subForm.icon}
                          onChange={e => setSubForm({ ...subForm, icon: e.target.value })}
                          placeholder="🔆"
                        />
                      </div> */}
                      <div className="admin-field">
                        <label>Order</label>
                        <input
                          type="number" value={subForm.order}
                          onChange={e => setSubForm({ ...subForm, order: e.target.value })}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
  <button
    type="button"                              // 👈 this is the fix
    className="btn-primary"
    onClick={() => handleSubAdd(cat._id)}
  >
    {editSubId ? 'Update Subcategory' : 'Add Subcategory'}
  </button>
  {editSubId && (
    <button
      type="button"                            // 👈 same here
      className="btn-outline"
      onClick={() => { setSubForm({ name: '', icon: '📦', order: 0 }); setEditSubId(null); }}
    >
      Cancel
    </button>
  )}
</div>
                  </div>
                )}

                {/* Existing subcategory list */}
                {cat.subcategories?.length > 0 && (
                  <div className="sub-list">
                    {cat.subcategories.map(sub => (
                      <div key={sub._id} className="sub-item">
                        <span>{sub.icon}</span>
                        <span className="sub-name">{sub.name}</span>
                        <div className="cat-manage-actions">
                          <button className="edit-btn" onClick={() => {
                            setSubForm({ name: sub.name, icon: sub.icon, order: sub.order });
                            setEditSubId(sub._id);
                            setSelectedCatForSub(cat._id);
                          }}>Edit</button>
                          <button className="delete-btn"
                            onClick={() => handleSubDelete(cat._id, sub._id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;