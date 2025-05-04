document.addEventListener('DOMContentLoaded', function() {
    const mainBlock = document.querySelector('main');
    const images = [
        'img/hoodwing_love.jpg',
        'img/hoodwing_insult.jpg',
        'img/my_certificate.jpg',
    ];

    images.forEach(imgSrc => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        imgContainer.style.display = 'inline-block';
        imgContainer.style.margin = '10px';
        imgContainer.style.cursor = 'pointer';
        imgContainer.style.transition = 'transform 0.3s ease';
        imgContainer.style.position = 'relative'; 
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.width = '200px';
        img.style.height = 'auto';
        img.style.objectFit = 'cover';
        img.style.position = 'relative'; 

        imgContainer.appendChild(img);
        mainBlock.appendChild(imgContainer);
        
        imgContainer.addEventListener('click', function() {
            if (img.style.transform === 'scale(4)') {
                img.style.transform = 'scale(1)';
                img.style.zIndex = '1';
            } else {
                img.style.transform = 'scale(4)';
                img.style.zIndex = '100'; 
            }
        });
    });
});