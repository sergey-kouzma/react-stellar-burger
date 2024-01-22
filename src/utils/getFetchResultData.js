export const   getFetchResultData = async (res) => {
    if (!res.ok) {
        throw new Error('');
    }
    return await res.json();
};

