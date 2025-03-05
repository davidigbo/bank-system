<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BankController extends Controller
{
    public function deposit(Request $request) 
    {
      $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $user = Auth::user();
        $user->increment("balance", $request->amount);

        Transaction::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'type' => 'deposit',
        ]);

        return response()->json(['message' => 'Deposited successfully'], 200);
    }

    public function withdraw(Request $request) 
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $user = Auth::user();

        if ($user->balance < $request->amount) {
            return response()->json(['message' => 'Insufficient balance'], 400);
        }

        $user->decrement("balance", $request->amount);

        Transaction::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'type' => 'withdraw',
        ]);

        return response()->json(['message' => 'Withdrawn successfully'], 200);
    }

    public function transfer(Request $request)
    {
        $rquest->validate([
            'recipient_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:1',
        ]);

        $user = Auth::user();
        if ($user->balance < $request->amount) {
            return response()->json(['message' => 'Insufficient balance'], 400);
        }

        $recipient = User::find($request->recipient_id);
        $user->decrement("balance", $request->amount);
        $recipient->increment("balance", $request->amount);

        Transaction::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'type' => 'transfer',
        ]);

        Transaction::create([
            'user_id' => $recipient->id,
            'amount' => $request->amount,
            'type' => 'transfer',
        ]);

        return response()->json(['message' => 'Transferred successfully'], 200);
    }

    public function transactions()
    {
        $transactions = Auth::user()->transactions;

        return response()->json($transactions, 200);
    }
}
