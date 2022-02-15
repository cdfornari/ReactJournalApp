

export const fileUpload = async (file) => {

    const cloudinaryUrl = '	https://api.cloudinary.com/v1_1/cdforna/upload';

    const formData = new FormData();
    formData.append('upload_preset','React-Journal')
    formData.append('file',file)

    try {
        const resp = await fetch(cloudinaryUrl,{
            method: 'POST',
            body: formData
        })

        if (resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json()
        }
    } catch (error) {
        throw error;
    }
}