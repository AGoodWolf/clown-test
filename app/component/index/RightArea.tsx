import { Box, Button, Card, CardActions, CardContent, CardMedia, styled, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clownDeleted } from"@/lib/features/clowns/clownSlice"

const CardBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    flexWrap:"wrap",
});

const StyledCard = styled(Card)({
    flex:"1 0 30%",
    margin: "10px",
    maxWidth:"30%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1) ",
    // transition: "transform 0.3s",
    // "&:hover":{
    //     transform:"translateY(-5px)"
    // }
});


const RowCards = ( )=>{
    const clownsList =  useAppSelector( (state)  => state.clowns.clownsList);
    const dispacth = useAppDispatch ();

    const handleDeleteClick = (e : React.MouseEvent<HTMLButtonElement>)=>{
        console.log(e.target);
        dispacth(clownDeleted(e.target.key as number));
    }

    return(
        <CardBox >
            {clownsList.map( (v,i )=>{
                return (
                <StyledCard key ={i}> 
                    <CardMedia component="img"  image={v.imgPath} alt="clown1" />
                    <CardContent>
                        <Typography>
                                {v.name}
                        </Typography>
                        <Typography>
                                {v.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small"> remodify </Button>
                        <Button size="small" key={i} onClick={handleDeleteClick}> delete </Button>
                    </CardActions>
                </StyledCard> 
                );} )
            }
        </CardBox>
    );
}

export default function RightArea(){
    return (
        <Box flex={6} p={2} sx={{maxWidth:"50%"}}>
            <RowCards></RowCards>
        </Box>
    )
} 