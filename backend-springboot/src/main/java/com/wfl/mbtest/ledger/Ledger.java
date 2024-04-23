package com.wfl.mbtest.ledger;

import java.sql.Date;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Ledger {

    private int ledgerId;
    private int userId;
    private String ledgerName;
    private String ledgerRegDate;
    private String ledgerModDate;
    private String ledgerMemo;

}