import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import type { Flower } from '../../types/flower.ts';
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import {setFlav} from "../../store/slices/flowerSlice.ts";
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';

interface FlowerCardProps {
    flower: Flower;
    onOpenDetails: (id: number) => void;
}

export const FlowerCard: React.FC<FlowerCardProps> = ({ flower, onOpenDetails }) => {
    const dispatch = useDispatch<AppDispatch>()

    const handleAddToFav=()=>{
        dispatch(setFlav(flower.id))
    }
    return (
        <Card
            sx={{
                width: "100%",
                height: "50vh",           // фиксированная высота всей карточки
                m: 1,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
            }}

        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[200], color: red[800] }}>
                        {flower.name[0]}
                    </Avatar>
                }
                title={flower.name}
                subheader={flower.category?.name ?? 'Без категории'}
                sx={{height:"10%"}}
            />
            {flower.imageUrl && (
                <CardMedia
                    component="img"
                    image={flower.imageUrl}
                    alt={flower.name}
                    sx={{
                        height: '25%',
                        objectFit: 'cover',
                    }}
                />
            )}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between' }}>
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
                <IconButton aria-label="add to favorites"><FavoriteIcon  onClick={handleAddToFav}/></IconButton>
                <IconButton aria-label="share"><ShareIcon /></IconButton>
                <IconButton
                    onClick={ ()=>onOpenDetails(flower.id)}
                    aria-label="add to cart"
                >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>

        </Card>
    );
};
