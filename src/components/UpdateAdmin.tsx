import {assetsAdmin} from "../assets/admin_assets/assets.ts";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useLocation, useParams} from "react-router-dom";
import {ShopContext} from "../context/ShopContext.tsx";
import { X } from "lucide-react";

export const UpdateAdmin = () =>{
    const token = localStorage.getItem("token");
    const {productId} = useParams();
    const {products} = useContext(ShopContext);
    const [oldImages, setOldImages] = useState([]);
    const {navigate} = useContext(ShopContext);
    const location = useLocation();

    const brandOptions = {
        LAPTOP: [
            { id: 1, name: "DELL" },
            { id: 2, name: "ASUS" },
            { id: 3, name: "MSI" }
        ],
        CAMERA: [
            { id: 4, name: "CANON" },
            { id: 5, name: "SONY" },
            { id: 6, name: "FUJIFILM" }
        ]
    };

    const categoryIds = {
        LAPTOP: 1,
        CAMERA: 2
    };

    const memoryOptions = [
        { id: 1, label: "128 GB" },
        { id: 2, label: "256 GB" },
        { id: 3, label: "512 GB" },
        { id: 4, label: "1 TB" }
    ];


    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("LAPTOP");
    const [brand, setBrand] = useState(1);
    const [bestseller, setBestseller] = useState(false);
    const [memory, setMemory] = useState([]);

    const onSubmitHander = async (e) => {
        e.preventDefault();

        try {
            if (!image1 && !image2 && !image3 && !image4) {
                toast.error("Vui lòng tải lên ít nhất 1 hình ảnh sản phẩm!");
                return;
            }

            const formData = new FormData();

            formData.append("product", JSON.stringify({
                id: productId,
                name,
                describes: description,
                price: Number(price),
                brand: Number(brand),
                categories: categoryIds[category],
                bestseller,
                memories: memory.map(id => Number(id))
            }));

            if (image1) formData.append("images", image1);
            if (image2) formData.append("images", image2);
            if (image3) formData.append("images", image3);
            if (image4) formData.append("images", image4);

            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
            const response = await axios.post("http://localhost:8080/shopqtq/createproduct", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("response", response.data);
            if (response.status === 200) {
                toast.success("Sửa sản phẩm thành công!");
                navigate("/admin/list")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi sửa sản phẩm:", error);
            toast.error("Lỗi khi sửa sản phẩm");
        }
    };

    const handleDeleteOldImage = async (url) => {
        try {
            console.log("url", url)

            const res = await axios.delete('http://localhost:8080/shopqtq/deleteproductimage', {
                params: {
                    productId: productId,
                    url: url
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                toast.success("Xoá ảnh thành công!");
                setOldImages(prev => prev.filter(img => img !== url));
            } else {
                toast.error("Lỗi khi xoá ảnh");
            }
        } catch (e) {
            toast.error("Lỗi server khi xoá ảnh");
            console.error(e);
        }
    };


    useEffect(() => {
        const data = products.find((item) => item.id === Number(productId));
        console.log("data", data);

        if (data) {
            setName(data.name || '');
            setDescription(data.describes || '');
            setPrice(data.price || '');
            setBestseller(data.bestseller || false);
            const memoryIds = memoryOptions
                .filter(opt => data.memories.some(mem => {
                    if (opt.label === "1 TB") return mem === "1" || mem === 1;
                    return opt.label.includes(mem.toString());
                }))
                .map(opt => opt.id);
            setMemory(memoryIds);

            setOldImages(data.images || []);

            setCategory(data.categories);
            // Tìm brand ID theo tên
            const matchedBrand = brandOptions[data.categories].find(b => b.name === data.brands);
            setBrand(matchedBrand ? matchedBrand.id : brandOptions[data.categories][0].id);
        }
    }, [products, location]);

    return (
        <form onSubmit={onSubmitHander} className="add-admin-form">
            <div style={{ width: "100%" }}>
                <p style={{ marginBottom: "0.5rem" }}>Tên sản phẩm</p>
                <input onChange={(e) => setName(e.target.value)} value={name} style={{
                    width: "100%",
                    maxWidth: "500px",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem"
                }}
                       type="text" placeholder="Nhập tên sản phẩm" required/>
            </div>

            <div style={{ width: "100%" }}>
                <p style={{ marginBottom: "0.5rem" }}>Mô tả sản phẩm</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} style={{
                    width: "100%",
                    maxWidth: "500px",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem"
                }}
                          type="text" placeholder="Nhập mô tả sản phẩm" required/>
            </div>

            <div className="add-admin-div">
                <div>
                    <p style={{ marginBottom: "0.5rem" }}>Loại sản phẩm</p>
                    <select
                        className="add-admin-select"
                        value={category}
                        onChange={(e) => {
                            const selected = e.target.value;
                            setCategory(selected);
                            setBrand(brandOptions[selected][0].id); // reset brand
                        }}>
                        <option value="LAPTOP">LAPTOP</option>
                        <option value="CAMERA">CAMERA</option>
                    </select>
                </div>

                <div>
                    <p style={{ marginBottom: "0.5rem" }}>Hãng</p>
                    <select className="add-admin-select" value={brand} onChange={(e) => setBrand(Number(e.target.value))}>
                        {brandOptions[category].map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p style={{ marginBottom: "0.5rem" }}>Giá sản phẩm</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className="add-admin-input" type="text" placeholder="Nhập giá" required/>
                </div>
            </div>

            <div>
                <p style={{ marginBottom: "0.5rem" }}>Bộ nhớ</p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                    {memoryOptions.map((mem) => (
                        <div
                            key={mem.id}
                            onClick={() =>
                                setMemory((prev) =>
                                    prev.includes(mem.id)
                                        ? prev.filter((m) => m !== mem.id)
                                        : [...prev, mem.id]
                                )
                            }
                        >
                            <p className={`${
                                memory.includes(mem.id)
                                    ? "add-admin-memory-blue"
                                    : "add-admin-memory-white"
                            } add-admin-memory`}
                            >
                                {mem.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                display: "flex",      // flex
                gap: "0.5rem",        // gap-2 (8px)
                marginTop: "0.5rem"   // mt-2 (8px)
            }}>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller"/>
                <label style={{cursor: "pointer"}} htmlFor="bestseller">Best seller</label>
            </div>

            <div>
                <p>Ảnh cũ</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {oldImages.map((url, index) => (
                        <div key={index} style={{ position: 'relative', width: '5rem', height: '5rem' }}>
                            <img
                                src={url}
                                alt="old"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 0 6px rgba(0,0,0,0.15)'
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteOldImage(url)}
                                style={{
                                    position: 'absolute',
                                    top: '0.25rem',
                                    right: '0.25rem',
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '9999px',
                                    width: '1.5rem',
                                    height: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s ease'
                                }}
                                onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgba(255,0,0,0.8)')}
                                onMouseOut={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)')}
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            <div>
                <p style={{ marginBottom: "0.5rem" }}
                >Upload File</p>

                <div style={{ display: "flex", gap: "0.5rem" }}
                >
                    <label htmlFor="image1">
                        <img style={{ width: "5rem" }} src={!image1 ? assetsAdmin.upload_area : URL.createObjectURL(image1)} alt={""}/>
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden/>
                    </label>
                    <label htmlFor="image2">
                        <img style={{ width: "5rem" }} src={!image2 ? assetsAdmin.upload_area : URL.createObjectURL(image2)} alt={""}/>
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden/>
                    </label>
                    <label htmlFor="image3">
                        <img style={{ width: "5rem" }} src={!image3 ? assetsAdmin.upload_area : URL.createObjectURL(image3)} alt={""}/>
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden/>
                    </label>
                    <label htmlFor="image4">
                        <img style={{ width: "5rem" }} src={!image4 ? assetsAdmin.upload_area : URL.createObjectURL(image4)} alt={""}/>
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden/>
                    </label>
                </div>
            </div>

            <button type="submit" className="add-admin-button">Sửa sản phẩm</button>
        </form>
    )
}
