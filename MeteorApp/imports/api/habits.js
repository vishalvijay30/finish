import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

Habits = new Mongo.Collection('habits');

Meteor.methods({
	'addHabit': function(habit){
		//expect habit to have {habitId: integer, title: String, streak: 0}
		Habits.insert({userId: habit.userId, title: habit.title, streak: habit.streak, completed: false});
		//return "success";
		return Habits.find().fetch();
	},
	'removeHabit': function(habit) {
		Habits.remove({_id: habit._id});
	},
	'updateStreak': function(habit) {
		//expect habit to have {habitId, integer, title: String, streak: int}
		Habits.update({_id: habit.habit._id}, {$inc: {streak: 1}, $set: {completed: true}});
	},
	'resetStreak': function(habit) {
		Habits.update({_id: habit.habit._id}, {$set: {streak: 0}});
	}
});

if (Meteor.isServer){
	Meteor.publish('habits', function habitsPublication() {
		return Habits.find({userId: this.userId});
	});
}