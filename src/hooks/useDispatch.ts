import { useDispatch } from "react-redux";
import { AppDispatch } from "../axios/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
