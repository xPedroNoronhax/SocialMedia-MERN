import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import { useEffect } from "react";
// import ChatPage from "./pages/ChatPage";

const App = () => {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  const refreshToken = () => {
    fetch("/api/refresh-token", {
      method: "POST",
      credentials: "include", // Ensures the cookie is sent
    }).then((response) => {
      if (response.ok) {
        console.log("Token refreshed");
      } else {
        console.log("Failed to refresh token");
        // Aqui você pode optar por deslogar o usuário se a renovação falhar
      }
    });
  };

  useEffect(() => {
    // Configura um intervalo para renovar o token a cada 4 minutos
    const intervalId = setInterval(refreshToken, 4 * 60 * 1000); // 4 minutos

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box position={"relative"} w={"full"}>
      <Container maxW={pathname === "/" ? "900px" : "620px"}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <HomePage /> <CreatePost />
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path="/user/:username/post/:pid" element={<PostPage />} />
          {/* <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to={"auth/"} />}
          /> */}
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
