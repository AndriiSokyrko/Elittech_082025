import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import type {Flower} from '../../types/flower.ts';
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import {  Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {useEffect} from "react";
import {deleteFlowerById, fetchFlowers} from "../../store/slices/flowerSlice.ts";


type Props = {
    type: string;
    shopId?: number;
    flowerId?: number;
}
interface FlowerCardProps {
    flower: Flower;
    onOpenEditForm: (args:Props) => void;
}

export const FlowerCardForEdit: React.FC<FlowerCardProps> = ({flower, onOpenEditForm}) => {
    const dispatch = useDispatch<AppDispatch>()

    const handleDelete = async (id:number) => {
        await dispatch(deleteFlowerById(id))
        await dispatch(fetchFlowers())
    };
    const handleEdit = (args:Props) => {
        onOpenEditForm(args)
    }

    return (
        <>

            <Card
            sx={{
                width: "100%",
                height: "auto",           // фиксированная высота всей карточки
                m: 1,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
            }}

        >
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[200], color: red[800]}}>
                        {flower.name[0]}
                    </Avatar>
                }
                title={flower.name}
                subheader={flower.category?.name ?? 'Без категории'}
                sx={{height: "10%"}}
            />
            {flower.imageUrl && (
                <CardMedia
                    component="img"
                    image={flower.imageUrl}
                    alt={flower.name}
                    sx={{
                        height: 200,        // фиксированная высота картинки
                        objectFit: 'cover'  // обрезка картинки, сохраняем пропорции
                    }}
                />
            )}
            <CardContent sx={{
                flexGrow: 1, display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Typography variant="body2" color="text.secondary" height="25%">
                    Магазин: {flower.shop?.name ?? 'Неизвестно'}
                </Typography>
                <Typography variant="h6" color="primary" fontSize="12px">
                    Цена: {flower.price} грн
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    В наличии: {flower.stock}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="edit flower" onClick={() => handleEdit({type:"update",flowerId:flower.id, shopId:flower.shopId})}>
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label="share" onClick={() => handleDelete(flower.id)}>
                    <DeleteIcon/>
                </IconButton>

            </CardActions>

        </Card></>
    );
};
