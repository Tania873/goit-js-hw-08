import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';

const galleryListEl = document.querySelector('.gallery');

const makeGalleryCard = ({ preview, original, description } = {}) => {
    const galleryCard = `
        <a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>`
    
    return galleryCard;
}

const galleryCardsArr = galleryItems.map(el => makeGalleryCard(el));

galleryListEl.insertAdjacentHTML("afterbegin", galleryCardsArr.join(''));

const onGalleryImgClick = event => {
    event.preventDefault();

        const { target } = event;

    if (target.nodeName !== 'IMG') {
        return;
    }

    new SimpleLightbox('.gallery a', { 
        captionsData: 'alt',
        captionDelay: 250,
     });
}

galleryListEl.addEventListener('click', onGalleryImgClick);