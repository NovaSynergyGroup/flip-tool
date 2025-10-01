async function analyzeFlip() {
    const input = document.getElementById('manifestInput').value.trim();
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    const resultDiv = document.getElementById('result');

    const formData = new FormData();
    formData.append('manifest', input);
    if (file) formData.append('file', file);

    try {
        resultDiv.innerHTML = 'Analyzing...';
        const response = await fetch('/api/analyze', {
            method: 'POST',
            body: formData
        });
        const apiData = await response.json();
        let analysis = Object.entries(apiData).map(([key, value]) => `- **${key}**: ${value}`).join('\n');
        resultDiv.innerHTML = analysis;
    } catch (e) {
        resultDiv.innerHTML = 'Error: ' + e.message;
    }
}
