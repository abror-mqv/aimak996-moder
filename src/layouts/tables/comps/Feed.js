import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
  Icon
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/material/styles';
import { BASE_URL } from 'constants/crud';
import MDBadge from 'components/MDBadge';
import MDBox from 'components/MDBox';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.01)',
    boxShadow: theme.shadows[6]
  }
}));  

const Feed = ({ ads, loading, setCurrentAd, onOpen }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!ads || ads.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Объявлений не найдено
      </Typography>
    );
  }

  const handleSetCurrentAd = (data) => {
    setCurrentAd(data)
    onOpen()
  }

  return (
    <Box sx={{ py: 4, width: "100%" }}>
  <Grid container spacing={3}>
    {ads.map((ad) => (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={ad.id}>
        <StyledCard>
          {ad.images?.length > 0 && (
            <CardMedia
              component="img"
              height="240"
              image={ad.images[0]}
              alt={ad.title}
              sx={{ objectFit: 'cover', borderRadius: 0 }}
            />
          )}
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Chip label={ad.category} color="primary" size="small" />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  {ad.contact_phone}
                </Typography>
              </Box>
            </Box>
            <Typography gutterBottom variant="h6" component="div">
              {ad.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {ad.description}
            </Typography>
            <MDBox sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <MDBox />
              <Chip label={ad.author} color="secondary" size="small" />
            </MDBox>
          </CardContent>
        </StyledCard>
      </Grid>
    ))}
  </Grid>
</Box>

  );
};

export default Feed;