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
        cap
      }
      currentBill {
        nextBill {
          amount
          period
        }
        additionalCharges
      }
      plans {
        offerId
        name
        expiration
        cost
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
        recurring {
          isAutoRenew
          expiryDate
        }
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

      bills {
        status
        period
        totalBillAmount
        pdfUrl
      }
      userBillingType
      activityHistory {
        calls {
          target
          date
          type
          cost
          seconds
        }
        sms {
          target
          date
          cost
        }
        data {
          usedData
          date
          cost
        }
      }
      userOffers {
        offerId
        name
        validity
        cost
        allowances {
          allowanceValue
          account {
            accountId
            name
            unit {
              abbreviation
            }
          }
        }
      }
      allowance {
        data {
          exists
          expiry
          data {
            left
            consumed
            total
            isUnlimited
            totalUnit
            leftUnit
            consumedUnit
          }
        }
        sms {
          exists
          expiry
          local {
            left
            consumed
            total
            exists
            isUnlimited
          }
          l2l {
            left
            consumed
            total
            exists
            isUnlimited
          }
          aio {
            left
            consumed
            total
            exists
            isUnlimited
          }
        }
        minutes {
          exists
          expiry
          local {
            left
            consumed
            total
            exists
            isUnlimited
          }
          l2l {
            left
            consumed
            total
            exists
            isUnlimited
          }
          aio {
            left
            consumed
            total
            exists
            isUnlimited
          }
        }
      }
      cpaExists
    }
  }
`;
