import { gql } from "@apollo/client";

export default gql`
  query getDashboardData($type: String!, $msisdn: String!) {
    getDashboardData(type: $type, msisdn: $msisdn) {
      balance {
        currentAmount
        description
        expirationDate
      }
      mainBalance {
        currentAmount
        description
        expirationDate
      }
      autoTopup {
        status
        topupAmount
        thresholdAmount
      }
      plans {
        offerId
        name
        total_data
        total_data_unit
        total_call
        total_international_call
        total_sms
        call_left
        international_call_left
        data_left
        data_left_unit
        sms_left
        international_call_consumed
        call_consumed
        data_consumed
        data_consumed_unit
        sms_consumed
      }
      bills {
        status
        period
        totalBillAmount
        pdfUrl
      }
      addons {
        offerId
        name
        total_data
        total_call
        total_international_call
        total_sms
        call_left
        international_call_left
        data_left
        sms_left
        international_call_consumed
        call_consumed
        data_consumed
        sms_consumed
      }
      activityHistory {
        calls {
          target
          date
          type
          cost
        }
        sms {
          target
          date
          cost
        }
      }
    }
  }
`;
