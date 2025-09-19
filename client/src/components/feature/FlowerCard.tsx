import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Flower } from '../../types/flower.ts';
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import {setFlav} from "../../store/slices/flowerSlice.ts";

interface FlowerCardProps {
    flower: Flower;
    onOpenDetails: (id: string) => void;
}

interface ExpandMoreProps extends React.ComponentProps<typeof IconButton> {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const FlowerCard: React.FC<FlowerCardProps> = ({ flower, onOpenDetails }) => {
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const handleExpandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // клик по стрелке не открывает диалог
        setExpanded(!expanded);
    };
    const handleAddToFav=()=>{
        dispatch(setFlav(flower.id))
    }
    return (
        <Card
            sx={{
                width: "25%",
                height: "auto",           // фиксированная высота всей карточки
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
                        height: 200,        // фиксированная высота картинки
                        objectFit: 'cover'  // обрезка картинки, сохраняем пропорции
                    }}
                />
            )}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                <ExpandMore
                    expand={expanded}
                    onClick={ ()=>onOpenDetails(flower.id)}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {flower.description || 'Описание отсутствует'}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};
