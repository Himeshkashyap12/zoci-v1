import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { togglePageLoader } from "../feature/loader/loaderSlice";
import api from "./axios";
export const AxiosInterceptor = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const onRequest = (request) => {
      dispatch(togglePageLoader(true));
      return request;
    };
    const onResponse = (response) => {
      dispatch(togglePageLoader(false));
      return response;
    };
    const onError = (error) => {
      dispatch(togglePageLoader(false));
      return Promise.reject(error);
    };
    const reqInterceptor = api.interceptors.request.use(onRequest, onError);
    const resInterceptor = api.interceptors.response.use(onResponse, onError);
    return () => {
      api.interceptors.response.eject(resInterceptor);
      api.interceptors.request.eject(reqInterceptor);
    };
  }, [dispatch]);
  return <>{children}</>;
};

AxiosInterceptor.propTypes = {
  children: PropTypes.node.isRequired,
};
