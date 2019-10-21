const loadOpenLayersMap = (callback) => {
    const existingScript = document.getElementById('openLayersMap');

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = '../maps/OpenLayers/OpenLayers.js';
        script.id = 'openLayersMap';
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        };
    }

    if (existingScript && callback) callback();
}