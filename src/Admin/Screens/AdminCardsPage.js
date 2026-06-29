import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import Sidebar from "../Components/Sidebar Components/Sidebar";
import ScreenError from "./ScreenError";
import { reset } from "../../API/Auth/authSlice";
import AdminCardManagement from "../Components/Admin Cards Components/AdminCardManagement";

const AdminCardsPage = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Admin Cards Management - Next Studio";
  }, []);

  useEffect(() => {
    const screenSize = () => setShow(window.innerWidth > 1080);
    screenSize();
    window.addEventListener("resize", screenSize);
    return () => window.removeEventListener("resize", screenSize);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/administrator");
    }
    return () => dispatch(reset());
  }, [user, navigate, dispatch]);

  return (
    <div>
      {!show ? (
        <ScreenError />
      ) : (
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col w-full px-20 py-10 ml-[260px]">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Digital Cards",
                  children: <AdminCardManagement />,
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCardsPage;
