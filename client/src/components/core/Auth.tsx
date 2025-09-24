import React, { useState } from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, ROOT_ROUTE} from "../../utils/consts";
import {login, registration} from "../../services/user";
import { validateEmail } from "../../utils/common";
import { Button, Card, TextField, Typography, Stack, Alert } from "@mui/material";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";

const Auth = () => {
    const navigate= useNavigate()
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [error, setError] = useState("");

    const handleClick = async () => {
        setError("");
        try {
            if (isLogin) {
                const token = await login({email, password});
                if (token) toast.success("Успешный вход!");
            } else {
                const token = await registration({email, password});
                if (token) toast.success("Успешная регистрация!");
            }
            navigate(ROOT_ROUTE);
        } catch (e: any) {
            setError(e?.response?.data?.message || "Произошла ошибка!");
        }
    };

    return (
        <Box className="Container">
            <Card sx={{ width: "100%", p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {isLogin ? "Авторизация" : "Регистрация"}
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Stack spacing={3}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsEmailValid(validateEmail(e.target.value));
                        }}
                        error={!isEmailValid}
                        helperText={!isEmailValid && "Введите корректный email"}
                        fullWidth
                    />

                    <TextField
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />

                    <Stack direction="row" flexDirection="column" justifyContent="space-between" alignItems="end">
                        <Typography variant="body2">
                            {isLogin ? (
                                <>
                                    Нет аккаунта?{" "}
                                    <NavLink to={REGISTRATION_ROUTE} style={{ fontWeight: "bold" }}>
                                        Зарегистрируйтесь!
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    Есть аккаунт?{" "}
                                    <NavLink to={LOGIN_ROUTE} style={{ fontWeight: "bold" }}>
                                        Войдите!
                                    </NavLink>
                                </>
                            )}
                        </Typography>

                        <Button variant="contained" onClick={handleClick}>
                            {isLogin ? "Войти" : "Регистрация"}
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
};

export default Auth;
