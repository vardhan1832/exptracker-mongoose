const Expense = require('../models/expenseTracker');
const mongoose = require('mongoose')
// const sequelize = require('../util/database')

exports.postExpenses = async (req,res,next)=>{
    // const t = await sequelize.transaction()
    try{
        const itemsperpage = Number(req.row);
        const amount = req.body.amount;
        const category = req.body.categry;
        const description = req.body.descript;
        let total_expenses = Number(amount) + Number(req.user.totalexpense);
        const exp = new Expense({
            amount: amount,
            category: category,
            description: description ,
            userId: req.user
        })
        const data = await exp.save()
        req.user.totalexpense = total_expenses
        await req.user.save()
        // const data = await Expense.create({amount: amount,category: category,description: description , UserId: req.user.id},{transaction: t})
        // await req.user.update({totalexpense: total_expenses },{transaction: t})
        // await t.commit()
        const numberofexpenses = await Expense.countDocuments({
           userId: req.user
        })
        res.status(201).json({userexpense: data , lastpage: Math.ceil(numberofexpenses/itemsperpage),});
    }catch(err){
        // await t.rollback()
        res.status(500).json({error:err})
    }
}
exports.getExpenses = async (req,res,next)=>{
    try{
        const itemsperpage = Number(req.row) ;
        const page = Number(req.params.page) ;
        const numberofexpenses = await Expense.countDocuments({
            userId: req.user
        })
        const expenses = await Expense.find({userId: req.user}).skip((page - 1) * itemsperpage).limit(itemsperpage)
        // const expenses = await req.user.getExpenses({
        //     offset: (page - 1) * itemsperpage,
        //     limit: itemsperpage
        // });
        res.status(201).json({
            allexpenses: expenses,
            currentpage: page,
            hasnextpage: itemsperpage*page < numberofexpenses,
            nextpage: page + 1,
            haspreviouspage: page > 1,
            previouspage: page - 1,
            lastpage: Math.ceil(numberofexpenses/itemsperpage),
            isPremiumUser: req.user.isPremiumUser
        });
    }catch(err){
        console.log(err)
        res.status(500).json({error: err})
    }
}
exports.deleteExpense = async (req,res,next)=>{
    // const t = await sequelize.transaction();
    try{
        const id = req.params.expid; 
        const expense = await Expense.findById(id)
        const amount = expense.amount;
        let total_expenses = Number(req.user.totalexpense) -  Number(amount);
        // console.log(expense.userId)
        // console.log(req.user._id)
        if(expense.userId.equals(req.user._id)){
            // console.log('hiii')
            await Expense.findByIdAndDelete(id)
            req.user.totalexpense = total_expenses
            await req.user.save()
            // await Expense.destroy({where:{id: id, UserId: req.user.id}},{transaction: t})
            // await req.user.update({totalexpense: total_expenses },{transaction: t})
            // await t.commit()
            res.status(201).json({message: 'expense deleted successfully'})
        }else{
            throw new Error()
        }
    }catch(err){
        // await t.rollback()
        console.log(err)
        res.status(500).json({error: err})
    }
}