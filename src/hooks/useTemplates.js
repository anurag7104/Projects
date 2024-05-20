import { useQuery } from "react-query"
import { getTemplates } from "../Api";

const useTemplates=()=>{
    const {data,isLoading,isError,refetch}=useQuery(
        "templates",
        async()=>{
            try{
                const templates=await getTemplates();
                return templates

            }
            catch(err){
                console.log(err)
                toast.error("something worg")
            }
        },
        {refetchOnWindowFocus:false}
    );
    return{
        data,
        isError,
        isLoading,
        refetch,
    };
};
export default useTemplates;