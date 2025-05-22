import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import {useLocation} from "react-router-dom";

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')){
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    }, [location]);

    return showSearch && visible ? (
        <div style={{borderTop: "1px solid", borderBottom: "1px solid", backgroundColor: "#F9FAFB", textAlign: "center"}}>
            <div className="searchbar-page">
                <input value={search} onChange={(e)=>setSearch(e.target.value)} style={{flex: "1", outline: "none", backgroundColor: "inherit", fontSize: "0.875rem"}} type="text" placeholder="Search" />
                <img style={{width: "1rem"}} src={assets.search_icon} alt={""}/>
            </div>
            <img onClick={()=> setShowSearch(false)} style={{display: "inline", width: "0.75rem", cursor: "pointer"}} src={assets.cross_icon} alt={""}/>
        </div>
    ) : null
}

export default SearchBar;
