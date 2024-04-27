use anchor_lang::prelude::*;

declare_id!("Au1ExzDo4BEEhdjbToCr1XrdGvVYfi2MNW9YDSmeLBUb");

#[program]
pub mod ledger_bootcamp {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
