import { useNavigate } from "react-router-dom";
import defaultProfileIcon from "../assets/header/default-profile-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeUser } from "@/features/user/userSlice";

const Header: React.FC = () => {
  const user = useSelector((state: any) => state.userReducer.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <header className="bg-secondary-color w-full flex justify-center">
      <nav className="container flex items-center justify-between py-3 lg:px-8">
        <div className="flex lg:flex-1">
          <span
            className="font-jua text-primary-color text-3xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            Purrfect
          </span>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src={user?.imageUrl || defaultProfileIcon}
                alt="profile-icon"
                className="w-[40px] cursor-pointer rounded-full border-2 border-primary-color"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  !user?._id ? navigate("/login") : navigate("/profile");
                }}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem onClick={() => logOutUser()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
