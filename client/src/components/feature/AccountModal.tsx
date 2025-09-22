import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Avatar,
    Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {getAccountById, updateAccount} from "../../store/slices/authSlice.ts";

export type AccountData = {
    id?:string;
    userName: string;
    email: string;
    phone?: string;
    address?: string;
    avatarFile?: File | null;
    avatarUrl?: string | null;
};

interface AccountModalProps {
    open: boolean;
    onSave: (data: AccountData) => void;
    onClose: () => void;
    saveLabel?: string;
    cancelLabel?: string;
}

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 520,
    maxWidth: '94vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
};

const AccountModal: React.FC<AccountModalProps> = ({
                                                       open,
                                                       onClose,
                                                       saveLabel = 'Save',
                                                       cancelLabel = 'Cancel',
                                                   }) => {
    const {user} = useSelector((state: RootState) => state.user);
    const [userName, setUserName] = useState<string>(user?.name||null);
    const [email, setEmail] = useState<string>(user?.email||"");
    const [phone, setPhone] = useState<string>(user?.phone||"");
    const [address, setAddress] = useState<string>(user?.address||"");
    const [description, setDescription] = useState<string>(user?.description||"");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatarFile||null);
    const [errors, setErrors] = useState<{ [k: string]: string }>({});
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        if (user?.id) {
            dispatch(getAccountById(user.id))
            setEmail(user.email?? "")
            setUserName(user.name?? "");
            setPhone(user.phone?? "");
            setAddress(user.address?? "");
            setDescription(user.description?? "");
            setAvatarFile(avatarFile ?? null);
            setAvatarUrl(user.avatarFile ?? "");
            setErrors({});
        }
    }, [user?.id]);

    useEffect(() => {
        if (!avatarFile) return;
        const url = URL.createObjectURL(avatarFile);
        setAvatarUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [avatarFile]);

    const validate = (): boolean => {
        const e: { [k: string]: string } = {};
        if (!userName.trim()) e.userName = 'Імʼя обовʼязкове';
        if (!email.trim()) e.email = 'Email обовʼязковий';
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) e.email = 'Невірний формат email';
        if (phone && !/^[+\d][\d\s-()]{4,}$/.test(phone)) e.phone = 'Невірний формат телефону';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setAvatarFile(file);
        }
    };

    const handleSave = () => {
        if (!validate()) return;

        const formData = new FormData();
        if (user.id) formData.append("id", user.id);
        if (userName) formData.append("userName", userName);
        if (email) formData.append("email", email);
        if (phone) formData.append("phone", phone);
        if (address) formData.append("address", address);
        if (description) formData.append("description", description);
        if (avatarFile) formData.append("avatar", avatarFile);
        dispatch(updateAccount(formData));
        // onClose()
    };

    const handleClearAvatar = () => {
        setAvatarFile(null);
        setAvatarUrl(null);
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="account-modal-title">
            <Box sx={modalStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography id="account-modal-title" variant="h6">
                        "Account's date"
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                    {/* Ліва колонка — поля */}
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            label="Імʼя"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            error={!!errors.userName}
                            helperText={errors.userName}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Телефон"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Адреса"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            fullWidth
                            margin="dense"
                            multiline
                            minRows={2}
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            margin="dense"
                            multiline
                            minRows={2}
                        />
                    </Box>

                    {/* Права колонка — аватар та дії */}
                    <Box sx={{ width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Avatar
                            src={avatarUrl ?? undefined}
                            alt={userName || 'avatar'}
                            sx={{ width: 96, height: 96 }}
                        />
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Button variant="outlined" component="label" size="small">
                                Load
                                <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                            </Button>
                            <Button variant="text" size="small" onClick={handleClearAvatar}>
                                Clear
                            </Button>
                        </Stack>

                        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, textAlign: 'center' }}>
                            Підтримуються зображення — JPEG, PNG. Менше 2MB рекомендовано.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
                    <Button onClick={onClose}>{cancelLabel}</Button>
                    <Button variant="contained" onClick={handleSave}>
                        {saveLabel}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AccountModal;
