import React, { useEffect } from 'react'
import CardDetails from "@src/Components/CardDetailComponent"
import { useDispatch, useSelector } from "@store/store"
import PublicListActions from "@store/V1/Service/Public/Get/ServiceListAction"
import GeneralHelper from "@src/Helpers/GeneralHelper";

const catalog = () => {

    const dispatch = useDispatch()

    const { public: {
        services,
        loading
    } } = useSelector(state => state.service)

    useEffect(() => {
        dispatch(PublicListActions.serviceList(GeneralHelper.Serialize({
            catalog_status: "active",
            status: "active"
          })));
    }, [])

    return (
        <div>
            {
                loading ?
                    <div className='text-center mt-5'>
                        <strong>Loading...</strong>
                    </div>
                    :
                    <CardDetails services={services} />
            }
        </div>
    )
}
export default catalog