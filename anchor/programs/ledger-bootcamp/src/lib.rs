use anchor_lang::prelude::*;

declare_id!("7BqJUqX6jPVifdvNHqJBV2ohtHxMJYz6SS8rezBpkYpS");

const MAX_DEPOSITS: usize = 20;

#[program]
pub mod ledger_bootcamp {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }

    pub fn init_bootcamp_escrow(ctx: Context<InitializeEscrow>, bootcamp_id: String) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        escrow.bootcamp_id = bootcamp_id;
        escrow.deposits = [(Pubkey::default(), 0); MAX_DEPOSITS];

        msg!("Escrow account created successfully for bootcamp");

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct InitializeEscrow<'info> {
    #[account(
        init,
        seeds = [b"escrow", signer.key().as_ref()],
        bump,
        payer = signer,
        space = 8 + std::mem::size_of::<EscrowAccount>() + 8,
    )]
    pub escrow: Account<'info, EscrowAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct EscrowAccount {
    pub bootcamp_id: String,
    pub deposits: [(Pubkey, u64); MAX_DEPOSITS], // student list
}
