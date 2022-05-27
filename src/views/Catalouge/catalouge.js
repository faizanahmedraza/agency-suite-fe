import React, { useEffect } from 'react'
import CardComponent from "@src/Components/CardComponent"
import { useDispatch, useSelector } from "@store/store"
import PublicListActions from "@store/V1/Service/Public/Get/ServiceListAction"

const catalog = () => {

    const dispatch = useDispatch()

    const { public: {
        services,
        loading
    } } = useSelector(state => state.service)

    useEffect(() => {
        dispatch(PublicListActions.serviceList())
    }, [])

    return (
        <div>
            {
                loading ?
                    <div className='text-center mt-5'>
                        <strong>Loading...</strong>
                    </div>
                    :
                    <CardComponent services={services} />
            }
        </div>
    )
}
export default catalog