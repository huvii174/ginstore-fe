import axiosClient from "./axiosClient";

const LogApi = {
    async store(data) {
        try {
            console.log('------------- LOG API');
            const url = `log-api/store`;
            const response = await axiosClient.post(url, data)
            if (response.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- getProfile@Error ', e);
            return {
                status: 501,
                data: []
            }
        }
    },
}

export default LogApi;
