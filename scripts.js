// Wrap all your existing code in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'FPSX112f0b37e5694d468d30bef1dfe5ba2b'; // Freepik API key
    let selectedStyle = ''; // To store the selected style
    let selectedAspectRatio = ''; // To store the selected aspect ratio
    let currentImageUrl = ''; // To store the current image URL
    let currentImageData = null; // To store the current image data
    let cropper; // Added for crop feature
    let currentShape = 'rect'; // Default shape

    // Aspect ratio mappings updated to match the API options
    const aspectRatioMappings = {
        'Square': 'square',
        'Portrait': 'portrait',
        'Standard': 'standard',
        'Rectangular': 'rectangular',
        'Widescreen': 'widescreen'
    };

    // Ensure consistent style formatting for the API
    const styleMappings = {
        'Digital Art': 'digital-art',
        'Vibrant': 'vibrant',
        'Golden Hour': 'golden-hour',
        'Minimalist': 'minimalist',
        'Vintage': 'vintage',
        'Monochrome': 'monochrome',
        'Surreal': 'surreal',
        'Abstract': 'abstract',
        'Fantasy': 'fantasy',
        'Futuristic': 'futuristic',
        'Pop Art': 'pop-art',
        'Cyberpunk': 'cyberpunk',
        'Retro': 'retro',
        'High Contrast': 'high-contrast',
        'Nature': 'nature',
        'Watercolor': 'watercolor',
        'Anime': 'anime',
        'Steampunk': 'steampunk'
    };

   async function fetchFreepikImage(prompt) {
       const requestBody = {
           prompt: prompt,
           // other parameters...
       };

       try {
           const response = await fetch('https://ec2-13-60-33-49.eu-north-1.compute.amazonaws.com/generate', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'Accept': 'application/json'
               },
               body: JSON.stringify(requestBody)
           });

           if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
           }

           const data = await response.json();
           // Handle the response data...
       } catch (error) {
           console.error('Error fetching image:', error);
         
    }
}

    // Toggle dropdown visibility for style and aspect ratio
    function toggleDropdown(dropdownButtonId, dropdownContentId) {
        const dropdownButton = document.getElementById(dropdownButtonId);
        const dropdownContent = document.getElementById(dropdownContentId);

        if (dropdownButton && dropdownContent) {
            dropdownButton.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                dropdownContent.classList.toggle('visible');
                console.log('Dropdown toggled:', dropdownContentId); // Debug log
            });
        } else {
            console.error('Dropdown elements not found:', dropdownButtonId, dropdownContentId);
        }
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(function(dropdown) {
            const content = dropdown.querySelector('.style-selector');
            if (content && !dropdown.contains(event.target)) {
                content.classList.remove('visible');
            }
        });
    });

    toggleDropdown('dropdownButton', 'dropdownContent');
    toggleDropdown('aspectRatioButton', 'aspectRatioContent');

    // Update the style selection handler
    document.querySelector('#dropdownContent').addEventListener('click', function(event) {
        if (event.target.classList.contains('style-option')) {
            const clickedStyle = event.target.textContent.trim();
            if (selectedStyle === clickedStyle) {
                // Deselect if already selected
                selectedStyle = '';
                event.target.classList.remove('selected');
            } else {
                // Select new style
                selectedStyle = clickedStyle;
                document.querySelectorAll('#dropdownContent .style-option').forEach(s => s.classList.remove('selected'));
                event.target.classList.add('selected');
            }
            console.log('Selected Style:', selectedStyle); // Debugging
        }
    });

    // Update the aspect ratio selection handler
    document.querySelector('#aspectRatioContent').addEventListener('click', function(event) {
        if (event.target.classList.contains('aspect-ratio-option')) {
            const clickedAspectRatio = event.target.textContent.trim();
            if (selectedAspectRatio === clickedAspectRatio) {
                // Deselect if already selected
                selectedAspectRatio = '';
                event.target.classList.remove('selected');
            } else {
                // Select new aspect ratio
                selectedAspectRatio = clickedAspectRatio;
                document.querySelectorAll('#aspectRatioContent .aspect-ratio-option').forEach(s => s.classList.remove('selected'));
                event.target.classList.add('selected');
            }
            console.log('Selected Aspect Ratio:', selectedAspectRatio); // Debugging
        }
    });

    // Handle color selection
    let selectedColor = '';
    document.querySelectorAll('#colorContent .color-option').forEach(color => {
        color.addEventListener('click', () => {
            const isSelected = color.classList.contains('selected');
            document.querySelectorAll('#colorContent .color-option').forEach(c => c.classList.remove('selected'));
            selectedColor = isSelected ? '' : color.dataset.value;
            color.classList.toggle('selected', !isSelected);
            console.log('Selected Color:', selectedColor); // Debugging
        });
    });

    // Implement similar logic for lighting and framing
    let selectedLighting = '';
    let selectedFraming = '';

    // Handle form submission
    const form = document.getElementById('imageForm');
    const generateButton = document.querySelector('.generate-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const prompt = document.getElementById('prompt').value.trim();
        if (prompt) {
            fetchFreepikImage(prompt);
        }
    });

    function generateImage() {
        const promptInput = document.getElementById('prompt');
        let prompt = promptInput.value.trim();

        if (prompt) {
            fetchFreepikImage(prompt);
        }
    }

    // Add this at the beginning of your file, after the DOMContentLoaded event listener

    const promptInput = document.getElementById('prompt');
    const prompts = [
        "A bonzai treehouse...",
        "A panda playing piano...",
        "Butterflies made of stained glass...",
        "A rainbow-colored elephant...",
        "A steampunk airship in a stormy sky...",
        "A train that travels through outer space...",
        "A jellyfish city glowing in the deep sea...",
        "Unicorns racing across the stars...",
        "A robot chef cooking gourmet meals...",
        "A cat wearing a superhero cape...",
        "A giraffe peeking into a skyscraper window...",
        "A hot air balloon shaped like a teapot...",
        "A knight in shining armor riding a dinosaur...",
        "A phoenix in a cup of coffee...",
        "A windmill made of candy canes...",
        "A clocktower with gears made of crystals...",
        "A circus in the middle of the ocean...",
        "A polar bear sipping a tropical drink...",
        "A kangaroo boxing match in a ring...",
        "A wizard casting spells with a paintbrush...",
        "A skyscraper made entirely of books...",
        "A moonlit garden with glowing flowers...",
        "A giant robot playing the violin...",
        "A spaceship docking at a space station...",
        "A fox wearing a monocle and top hat...",
        "A pirate ship sailing through the sky...",
        "A bicycle with wings flying over a rainbow...",
        "A cat lounging on a floating cloud...",
        "A neon-lit street in a futuristic city...",
        "A giant octopus holding an umbrella...",
        "A rabbit reading a bedtime story to other animals...",
        "A roller coaster that travels through time...",
        "A sunflower field under a starry night sky...",
        "A dragon made of fire and ice...",
        "A carousel with rides made of sweets...",
        "A peacock with feathers made of jewels...",
        "A village inside a giant mushroom...",
        "A raccoon piloting a spaceship...",
        "A dragon curled around a mountain peak...",
        "A city of glass skyscrapers under the ocean...",
        "A waterfall of stars in a cosmic landscape...",
        "A bear riding a unicycle on a tightrope...",
        "A cat cafe in a treehouse...",
        "A dragonfly with wings made of stained glass...",
        "A library filled with ancient scrolls and maps...",
        "A turtle with a city on its back...",
        "A phoenix flying over a stormy sky...",
        "A hot air balloon festival over a mountain range...",
        "A robot dog playing fetch with a glowing ball...",
        "A floating island with a waterfall falling into the sky...",
        "A castle made of clouds and rainbows...",
        "A mermaid exploring an underwater cave...",
        "A dragon guarding a treasure of glowing crystals...",
        "A spaceship racing through a meteor shower...",
        "A tree with doors to different dimensions...",
        "A cat playing the piano under a full moon...",
        "A futuristic city with flying cars and neon lights...",
        "A wolf howling at a glowing moon...",
        "A robot butler serving tea in a garden...",
        "A dragon and phoenix intertwined in flight...",
        "A bridge made of glowing crystals...",
        "A tree with glowing blossoms in a dark forest...",
        "A floating market with colorful boats...",
        "A waterfall of lava flowing into a crystal lake...",
        "A robot bartender mixing glowing drinks...",
        "A city on a floating island in the clouds...",
        "A lighthouse in the middle of a cosmic storm...",
        "A hot air balloon shaped like a giant cupcake...",
        "A cat sitting on a crescent moon...",
        "A dragon breathing fire in a snowy landscape...",
        "A robot gardener tending to a glowing garden...",
        "A spaceship landing on an alien planet...",
        "A steampunk train traveling through a canyon...",
        "A phoenix rising from the ashes in a fiery sky...",
        "A city built on the back of a giant turtle...",
        "A dragon sleeping in a nest of gold...",
        "A waterfall flowing from a floating island...",
        "A cat wearing a wizard's hat casting a spell...",
        "A lighthouse on a floating rock in the sky...",
        "A spaceship flying through a ringed planet...",
        "A tree with leaves made of glowing butterflies...",
        "A giant octopus attacking a pirate ship...",
        "A dragon flying over a city at sunset...",
        "A mermaid sitting on a rock under a full moon...",
        "A robot playing chess with a cat...",
        "A cat riding a bicycle through a field of flowers...",
        "A dragon wrapped around a glowing orb...",
        "A ship sailing through a sea of stars...",
        "A phoenix soaring above a volcanic landscape...",
        "A treehouse with glowing lanterns in the trees...",
        "A cat sitting on a floating platform in space...",
        "A robot exploring an alien jungle...",
        "A phoenix flying through a cosmic storm...",
        "A waterfall cascading into a glowing cave...",
        "A dragon curled around a glowing orb...",
        "A cat sitting on a floating lily pad in a pond...",
        "A futuristic city with giant holograms...",
        "A dragon sleeping in a nest of gold...",
        "A mermaid swimming with glowing fish...",
        "A robot dog walking through a neon-lit street...",
        "A phoenix flying through a cosmic storm...",
        "A waterfall of light in a dark forest...",
        "A dragon flying through a galaxy of stars...",
        "A city floating in a bubble in the sky...",
        "A cat playing with a glowing ball of yarn...",
        "A robot dog exploring a neon-lit city..."
    ];
    

    let currentPromptIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typePrompt() {
        const currentPrompt = prompts[currentPromptIndex];
        
        if (isDeleting) {
            promptInput.placeholder = currentPrompt.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            promptInput.placeholder = currentPrompt.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentCharIndex === currentPrompt.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
        }

        setTimeout(typePrompt, typingSpeed);
    }

    // Start the typing effect
    typePrompt();

    // Clear placeholder when input is focused
    promptInput.addEventListener('focus', function() {
        this.placeholder = '';
    });

    // Restore typing effect when input loses focus and is empty
    promptInput.addEventListener('blur', function() {
        if (this.value === '') {
            typePrompt();
        }
    });

    // Add these functions at the end of the file, inside the DOMContentLoaded event listener

    function addImageToLibrary(imageUrl, prompt) {
        const imageGrid = document.querySelector('.image-grid');
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.innerHTML = `
            <div class="image-container">
                <img src="${imageUrl}" alt="${prompt}">
            </div>
            <div class="image-overlay">${prompt}</div>
            <button class="download-button">⬇️</button>
            <button class="crop-button">✂️</button>
        `;
        imageGrid.appendChild(imageItem);

        // Add event listener for the new crop button
        const cropButton = imageItem.querySelector('.crop-button');
        cropButton.addEventListener('click', () => initCrop(imageUrl));

        // Existing download button logic
        const downloadButton = imageItem.querySelector('.download-button');
        downloadButton.addEventListener('click', (e) => {
            e.stopPropagation();
            downloadImage(imageUrl, prompt);
        });

        // Existing image click logic for expansion
        imageItem.addEventListener('click', () => expandImage(imageUrl));
    }

    function saveImageToLocalStorage(imageUrl, prompt) {
        try {
            let images = JSON.parse(localStorage.getItem('generatedImages')) || [];
            const newImage = { url: imageUrl, prompt: prompt, date: new Date().toISOString() };
            
            // Limit to storing only the last 20 images
            images = [newImage, ...images.slice(0, 19)];
            
            localStorage.setItem('generatedImages', JSON.stringify(images));
        } catch (error) {
            console.error('Error saving to local storage:', error);
            if (error.name === 'QuotaExceededError') {
                console.log('Storage quota exceeded. Clearing local storage and trying again.');
                clearLocalStorage();
                saveImageToLocalStorage(imageUrl, prompt); // Try saving again
            }
        }
    }

    function clearLocalStorage() {
        localStorage.removeItem('generatedImages');
        console.log('Local storage cleared');
    }

    function loadImagesFromLocalStorage() {
        const images = JSON.parse(localStorage.getItem('generatedImages')) || [];
        const imageLibrary = document.querySelector('.image-grid');
        
        images.forEach(image => {
            addImageToLibrary(image.url, image.prompt);
        });
    }

    function expandImage(imageUrl) {
        const expandedImageDiv = document.createElement('div');
        expandedImageDiv.className = 'expanded-image';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Expanded Image';
        
        expandedImageDiv.appendChild(img);
        document.body.appendChild(expandedImageDiv);

        expandedImageDiv.addEventListener('click', () => {
            document.body.removeChild(expandedImageDiv);
        });
    }

    // Call this function when the page loads
    loadImagesFromLocalStorage();


    // Add this to your existing JavaScript file, inside the DOMContentLoaded event listener

    const imageLibrary = document.querySelector('.image-library');
    const scrollLeftButton = document.querySelector('.scroll-left');
    const scrollRightButton = document.querySelector('.scroll-right');
    const imageGrid = document.querySelector('.image-grid');

    imageLibrary.addEventListener('mouseenter', () => {
        updateScrollButtons();
    });

    imageLibrary.addEventListener('mouseleave', () => {
        scrollLeftButton.style.display = 'none';
        scrollRightButton.style.display = 'none';
    });

    scrollLeftButton.addEventListener('click', () => {
        imageGrid.scrollBy({ left: -220, behavior: 'smooth' });
        updateScrollButtons();
    });

    scrollRightButton.addEventListener('click', () => {
        imageGrid.scrollBy({ left: 220, behavior: 'smooth' });
        updateScrollButtons();
    });

    function updateScrollButtons() {
        scrollLeftButton.style.display = imageGrid.scrollLeft > 0 ? 'flex' : 'none';
        scrollRightButton.style.display = 
            imageGrid.scrollLeft < imageGrid.scrollWidth - imageGrid.clientWidth ? 'flex' : 'none';
    }

    window.addEventListener('resize', () => {
        if (imageLibrary.matches(':hover')) {
            updateScrollButtons();
        }
    });
    // Add these new functions
    function initCrop() {
        console.log('Initializing crop');
        const cropContainer = document.querySelector('.crop-container');
        const cropImage = document.getElementById('cropImage');
        
        if (!currentImageUrl) {
            console.error('No image to crop');
            return;
        }

        cropImage.src = currentImageUrl;
        cropContainer.classList.remove('hidden');

        console.log('Creating Cropper instance');
        if (cropper) {
            cropper.destroy();
        }

        cropper = new Cropper(cropImage, {
            aspectRatio: NaN,
            viewMode: 1,
            dragMode: 'move',
            background: false,
            autoCropArea: 0.8,
            responsive: true,
            restore: false,
            guides: true,
            center: true,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: true,
        });

        // Add event listeners for shape buttons
        const shapeButtons = document.querySelectorAll('.crop-shape-button');
        shapeButtons.forEach(button => {
            button.addEventListener('click', () => changeShape(button.dataset.shape));
        });

        document.getElementById('applyCrop').addEventListener('click', applyCrop);
        document.getElementById('cancelCrop').addEventListener('click', cancelCrop);
    }

    function changeShape(shape) {
        console.log('Changing shape to:', shape);
        if (!cropper) {
            console.error('Cropper not initialized');
            return;
        }

        currentShape = shape;

        // Remove active class from all buttons
        document.querySelectorAll('.crop-shape-button').forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        document.querySelector(`.crop-shape-button[data-shape="${shape}"]`).classList.add('active');

        const cropBox = cropper.getCropBoxData();
        const canvas = cropper.getCanvasData();
        const containerData = cropper.getContainerData();

        let newWidth, newHeight;

        switch (shape) {
            case 'circle':
            case 'square':
                newWidth = newHeight = Math.min(cropBox.width, cropBox.height);
                break;
            case 'triangle':
            case 'star':
            case 'heart':
            case 'hexagon':
                newWidth = cropBox.width;
                newHeight = cropBox.height;
                break;
            case 'rect':
            default:
                newWidth = cropBox.width;
                newHeight = cropBox.height;
                break;
        }

        // Center the new crop box
        const left = cropBox.left + (cropBox.width - newWidth) / 2;
        const top = cropBox.top + (cropBox.height - newHeight) / 2;

        cropper.setCropBoxData({
            left: Math.max(0, Math.min(left, containerData.width - newWidth)),
            top: Math.max(0, Math.min(top, containerData.height - newHeight)),
            width: newWidth,
            height: newHeight
        });

        updateCropBoxShape(shape);
    }

    function updateCropBoxShape(shape) {
        const cropBox = document.querySelector('.cropper-crop-box');
        const viewBox = cropBox.querySelector('.cropper-view-box');
        const face = cropBox.querySelector('.cropper-face');

        // Reset clip-path
        viewBox.style.clipPath = 'none';
        face.style.clipPath = 'none';

        switch (shape) {
            case 'circle':
                viewBox.style.borderRadius = '50%';
                face.style.borderRadius = '50%';
                break;
            case 'triangle':
                viewBox.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                face.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                break;
            case 'star':
                const starPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
                viewBox.style.clipPath = starPath;
                face.style.clipPath = starPath;
                break;
            case 'heart':
                const heartPath = 'path("M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 15.809-6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181")';
                viewBox.style.clipPath = heartPath;
                face.style.clipPath = heartPath;
                break;
            case 'hexagon':
                viewBox.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
                face.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
                break;
            case 'rect':
            case 'square':
            default:
                viewBox.style.borderRadius = '0';
                face.style.borderRadius = '0';
                break;
        }
    }

    function applyCrop() {
        console.log('Applying crop');
        if (!cropper) {
            console.error('Cropper not initialized');
            return;
        }

        const croppedCanvas = cropper.getCroppedCanvas();
        if (!croppedCanvas) {
            console.error('Failed to get cropped canvas');
            return;
        }

        // Create a new canvas for the shaped crop
        const shapedCanvas = document.createElement('canvas');
        const ctx = shapedCanvas.getContext('2d');
        shapedCanvas.width = croppedCanvas.width;
        shapedCanvas.height = croppedCanvas.height;

        // Apply the shape mask
        ctx.save();
        applyShapeMask(ctx, currentShape, shapedCanvas.width, shapedCanvas.height);
        ctx.clip();
        ctx.drawImage(croppedCanvas, 0, 0, shapedCanvas.width, shapedCanvas.height);
        ctx.restore();

        const dataUrl = shapedCanvas.toDataURL('image/png');
        updateCroppedImage(dataUrl);
        cancelCrop();
    }

    function applyShapeMask(ctx, shape, width, height) {
        switch (shape) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, Math.PI * 2);
                ctx.closePath();
                break;
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(0, height);
                ctx.lineTo(width, height);
                ctx.closePath();
                break;
            case 'star':
                drawStar(ctx, width / 2, height / 2, 5, width / 4, width / 2);
                break;
            case 'heart':
                drawHeart(ctx, width / 2, height / 2, Math.min(width, height) / 2);
                break;
            case 'hexagon':
                drawHexagon(ctx, width / 2, height / 2, Math.min(width, height) / 2);
                break;
            case 'rect':
            case 'square':
            default:
                ctx.rect(0, 0, width, height);
                break;
        }
    }

    function drawStar(ctx, cx, cy, spikes, innerRadius, outerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    }

    function drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(x, y, x - size / 2, y - size / 2, x - size, y + size / 4);
        ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.25, x, y + size * 1.25);
        ctx.bezierCurveTo(x, y + size * 1.25, x + size, y + size, x + size, y + size / 4);
        ctx.bezierCurveTo(x + size / 2, y - size / 2, x, y, x, y + size / 4);
        ctx.closePath();
    }

    function drawHexagon(ctx, x, y, size) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / 6), y + size * Math.sin(i * 2 * Math.PI / 6));
        }
        ctx.closePath();
    }

    function cancelCrop() {
        console.log('Cancelling crop');
        const cropContainer = document.querySelector('.crop-container');
        cropContainer.classList.add('hidden');
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
    }

    function updateCroppedImage(dataUrl) {
        console.log('Updating cropped image');
        const contentDiv = document.querySelector('.content');
        contentDiv.innerHTML = `
            <img src="${dataUrl}" alt="Cropped Image" class="generated-image">
            <button id="cropButton" class="crop-button">Crop Image</button>
        `;
        
        currentImageUrl = dataUrl;
        addImageToLibrary(dataUrl, 'Cropped Image');

        // Re-add event listener for the new crop button
        document.getElementById('cropButton').addEventListener('click', initCrop);
    }

    // Make sure to call this function when an image is generated
    function showCropButton() {
        const cropButton = document.getElementById('cropButton');
        cropButton.classList.remove('hidden');
        cropButton.addEventListener('click', initCrop);
    }

    // Example of how to safely add an event listener
    const someElement = document.getElementById('someElementId');
    if (someElement) {
        someElement.addEventListener('click', function() {
            // Your event handler code here
        });
    }

    // Apply this pattern to all your event listeners
    // For example, for the dropdown button:
    const dropdownButton = document.getElementById('dropdownButton');
    if (dropdownButton) {
        dropdownButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const dropdownContent = document.getElementById('dropdownContent');
            if (dropdownContent) {
                dropdownContent.classList.toggle('visible');
            }
        });
    }

    const styleOptions = document.querySelectorAll('.style-option');
    const aspectRatioOptions = document.querySelectorAll('.aspect-ratio-option');

    function handleSelection(options, allowMultiple = false, selectionType) {
        options.forEach(option => {
            option.addEventListener('click', function() {
                if (this.classList.contains('selected')) {
                    // Deselect if already selected
                    this.classList.remove('selected');
                    if (selectionType === 'style') {
                        selectedStyle = '';
                    } else if (selectionType === 'aspectRatio') {
                        selectedAspectRatio = '';
                    }
                } else {
                    if (!allowMultiple) {
                        // Deselect all others if multiple selection is not allowed
                        options.forEach(opt => opt.classList.remove('selected'));
                    }
                    // Select the clicked option
                    this.classList.add('selected');
                    if (selectionType === 'style') {
                        selectedStyle = this.textContent.trim();
                    } else if (selectionType === 'aspectRatio') {
                        selectedAspectRatio = this.textContent.trim();
                    }
                }
                console.log(`Selected ${selectionType}:`, selectionType === 'style' ? selectedStyle : selectedAspectRatio);
            });
        });
    }

    // Initialize selection handlers
    handleSelection(styleOptions, false, 'style'); // Only one style can be selected at a time
    handleSelection(aspectRatioOptions, false, 'aspectRatio'); // Only one aspect ratio can be selected at a time

    // Add this function to your existing JavaScript file
    function scrollSelectedIntoView(container, selected) {
      if (window.innerWidth < 768) {
        const containerRect = container.getBoundingClientRect();
        const selectedRect = selected.getBoundingClientRect();
        const scrollLeft = selected.offsetLeft - containerRect.width / 2 + selectedRect.width / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }

    // Modify your existing event listeners to include this new function
    document.querySelector('#styleContent').addEventListener('click', function(event) {
      if (event.target.classList.contains('style-option')) {
        // ... existing code ...
        scrollSelectedIntoView(this, event.target);
      }
    });

    document.querySelector('#aspectRatioContent').addEventListener('click', function(event) {
      if (event.target.classList.contains('aspect-ratio-option')) {
        // ... existing code ...
        scrollSelectedIntoView(this, event.target);
      }
    });
});
