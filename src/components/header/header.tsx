import  "../../App.scss"

const Header: React.FC = () => {
    return (
        <>
            <div className="header">
                <ul className="header-list">
                    <li className="header-item">
                        <img className={""} alt={"Anh header"}/>
                    </li>
                    <li className="header-item">
                        Trang chủ
                    </li>
                </ul>
                <ul className="header-list">
                    <li className="header-item">
                        Đăng nhập
                    </li>
                    <li className="header-item">
                        Đăng xuất
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Header;
