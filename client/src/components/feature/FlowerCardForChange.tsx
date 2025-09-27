import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type {Flower} from '../../types/flower.ts';
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import {setFlav} from "../../store/slices/flowerSlice.ts";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {useState} from "react";
import FlowerEdit from "./FlowerEdit.tsx";

interface FlowerCardProps {
    flower: Flower;
    onOpenDetails: (id: number) => void;
}

interface ExpandMoreProps extends React.ComponentProps<typeof IconButton> {
    expand: boolean;
}


export const FlowerCardForChang: React.FC<FlowerCardProps> = ({flower, onOpenDetails}) => {
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const handleDelete = (id:number) => {

    };
    const handleEdit = (id:number) => {

        onOpenDetails(id)
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
                <IconButton aria-label="edit flower" onClick={() => handleEdit(flower.id)}>
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label="share" onClick={() => handleDelete(flower.id)}>
                    <DeleteIcon/>
                </IconButton>

            </CardActions>

        </Card></>
    );
};
