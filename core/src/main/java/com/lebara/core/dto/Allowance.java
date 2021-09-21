package com.lebara.core.dto;

public class Allowance {
    private int allowanceValue;
    private Account account;

    public int getAllowanceValue() {
        return allowanceValue;
    }

    public void setAllowanceValue(int allowanceValue) {
        this.allowanceValue = allowanceValue;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

}
