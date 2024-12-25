import React from 'react'
import BasicTable from '../../../components/Table'
import useAggregatePayments from '../hooks/useAggregatePayment';
import PaymentDetail from './PaymentDetail';

const AggregatePayments = () => {
    const {
        rows,
        columns,
        loading,
        paymentDetail,
        handleClosePaymentDetail
    } = useAggregatePayments();

   
    
    return (
        <>
           {!paymentDetail &&<BasicTable rows={rows} columns={columns} loading={loading} />}

            {
                paymentDetail && <PaymentDetail
                    paymentDetail={paymentDetail}
                    back={handleClosePaymentDetail}
               
                />
            }
        </>

    )
}

export default AggregatePayments