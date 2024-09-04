import { Box, Button, Card, CardActions, CardContent, CardMedia, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { clownsAdded} from "@/lib/features/clowns/clownSlice"

const FormBox = styled(Box)({
    display:"flex",
    flexDirection:"column",
});



const initFormData = {
    imgpath:"",
    name:'',
    description: ""
}

const StyledInput = styled("input")(
    {
        display: "none"
    }
);



export default function RightArea(){
    const [imageurl,setImageurl] = useState("");
    const [formData, setFormData] = useState({...initFormData});
    const dispacth = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: any}>) => {
        const { name, value} = event.target as HTMLInputElement;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        var file = event.target.files?.[0];
        if(file){
            const url = URL.createObjectURL(file);
            setFormData({ ...formData, imgpath: url });
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageurl(reader.result as string);
                // console.log('Base64 URL:', reader.result);
            };
        }
    };

    const handleImageClick = () =>{
        setFormData({ ...formData, imgpath: "" });
    }
    
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        if(formData.imgpath.length>0 && imageurl){      
            dispacth(clownsAdded({
                name: formData.name,
                description: formData.description,
                id: 0,
                imgPath: imageurl
            }));

        }
        setFormData({...initFormData});
      };

    return (
        <Box flex={6} p={2} display="flex" justifyContent="center" sx={{ maxWidth:"50%"}}>      
            <Card sx={{minWidth:"400px",maxWidth:"600px"}}>
                <CardContent>
                    <Typography variant="h5" > Clown Registration </Typography>
                    <FormBox component="form" onSubmit={handleSubmit} >
                        
                            { formData.imgpath.length === 0 && <Button variant="contained" component="span">
                                Select Image
                                <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleUploadClick}
                                 />
                            </Button>}
                            {formData.imgpath && <Box
                                component="img"
                                sx={{
                                    height: 200,
                                    width: 300,
                                    maxHeight: { xs: 200, md: 100 },
                                    maxWidth: { xs: 300, md: 200 },
                                }}
                                alt="The house from the offer."
                                src={formData.imgpath}
                                onClick={handleImageClick}
                            />}
                        <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                        />

                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <Button variant="contained" color="primary" type="submit" >
                            Submit
                        </Button>
                    </FormBox>
                </CardContent>
            </Card>
        </Box>
        
    );
}