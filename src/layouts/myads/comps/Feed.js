import React, { useState } from 'react';
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
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/material/styles';
import { BASE_URL } from 'constants/crud';
import MDBadge from 'components/MDBadge';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.01)',
    boxShadow: theme.shadows[6]
  }
}));  

const Feed = ({ ads, loading, onOpen, setCurrentAd }) => {
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState(null);

  const handleDeleteClick = (adId) => {
    setSelectedAdId(adId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${BASE_URL}/ads/delete/${selectedAdId}`);
      setDeleteDialogOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting ad:', error);
      alert(t('myads.delete.error'));
    }
  };

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {ads.map((ad) => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <StyledCard>
              {ad.images && ad.images.length > 0 && (
                <CardMedia
                  component="img"
                  height="200"
                  image={`${ad.images[0]}`}
                  alt={ad.title}
                  sx={{ objectFit: 'cover' }}
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
                <Typography variant="body2" color="text.secondary" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {ad.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <MDBadge color="dark" onClick={()=>{
                            console.log(ad)
                            handleSetCurrentAd(
                              {
                                id: ad.id,
                                description: ad.description,
                                contact_phone: ad.contact_phone,
                                category_id: ad.category_id,
                                city_ids: ad.cities_ids
                              }
                            )
                    }}>
                    <Icon>edit</Icon>
                   </MDBadge>
                   <MDBadge color="error" onClick={() => handleDeleteClick(ad.id)}>
                    <Icon>delete</Icon>
                   </MDBadge>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{t('myads.delete.title')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('myads.delete.message')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            {t('myads.delete.cancel')}
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            {t('myads.delete.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Feed;