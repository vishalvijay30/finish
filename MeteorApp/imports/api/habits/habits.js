import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

Habits = new Mongo.Collection('habits');

Meteor.methods({
	'addHabit': function(habit){
		//expect habit to have {habitId: integer, title: String, streak: 0}
		d = new Date()
		Habits.insert({userId: habit.userId, title: habit.title, streak: 0, max: 0, completed: false, last_time: d.getTime()});
		//return "success";
		return Habits.find().fetch();
	},
	'removeHabit': function(habit) {
		habit = habit.habit;
		Habits.remove({_id: habit._id});
	},
	'updateStreak': function(habit) {
		habit = habit.habit;
		//expect habit to have {habitId, integer, title: String, streak: int}
		d = new Date()
		Habits.update({_id: habit._id}, {$inc: {streak: 1}, $set: {completed: true, last_time: d.getTime()}});
		if (habit.streak > habit.max) {
			Meteor.call('updateMax', {habit: habit});
		}
	},
	'resetStreak': function(habit) {
		habit = habit.habit;
		Habits.update({_id: habit._id}, {$set: {streak: 0}});
	},
	'updateMax': function(habit) {
		habit = habit.habit;
		Habits.update({_id: habit._id}, {$set: {max: habit.streak}})
	},
	'refreshList': function() {
		habit_list = Habits.find().fetch();
		for (i=0; i < len(habit_list); i++) {
			if (habit_list[i].completed == false) {
				Meteor.call('resetStreak', {habit: habit_list[i]});
			} else {
				Habits.update({_id: habit_list[i]._id}, {$set: {completed: false}});
			}
		}
	},
	
});

if (Meteor.isServer){
	Habits.remove({userId: null});
	Meteor.publish('habits', function habitsPublication() {
		return Habits.find({userId: this.userId});
	});
	setInterval(() => {Meteor.call('refreshList')}, 1000*60*60*24);
}
