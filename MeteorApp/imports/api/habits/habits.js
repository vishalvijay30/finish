import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

Habits = new Mongo.Collection('habits');

Meteor.methods({
	'addHabit': function(habit){
		//expect habit to have {habitId: integer, title: String, streak: 0}
		d = new Date()
		Habits.insert({
			userId: habit.userId,
			title: habit.title,
			streak: 0,
			max: 0,
			completed: false,
			lastCompleted: habit.lastCompleted,
		});
		//return "success";
		return Habits.find().fetch();
	},
	'removeHabit': function(habit) {
		Habits.remove({_id: habit._id});
	},
	'updateStreak': function(habit) {
		console.log("update streak");
		var now = habit.lastCompleted;
		habit = habit.habit;
		//expect habit to have {habitId, integer, title: String, streak: int}
		Habits.update({_id: habit._id}, {$inc: {streak: 1}, $set: {completed: true, lastCompleted: now}});
		habit.streak = habit.streak+1;

		if (habit.streak > habit.max) {
			Habits.update({_id: habit._id}, {$set: {max: habit.streak}});
			console.log(Habits.find({_id: habit._id}).fetch());
		}
	},
	'modifyHabits': function(data){
		var toBeToggled = data.toggled;
		var toBeReset = data.reset;
		for (var i = 0; i < toBeToggled.length; i++){
			Habits.update({_id:toBeToggled[i]}, {$set: {completed: false}});
		}
		for (var j = 0; j < toBeReset.length, j++){
			Habits.update({_id: toBeReset[j]}, {$set: {streak: 0, completed: false}});
		}
	},
});

if (Meteor.isServer){
	Habits.remove({userId: null});
	Meteor.publish('habits', function habitsPublication() {
		//console.log(Habits.find({userId: this.userId}).fetch());
		return Habits.find({userId: this.userId});
	});
}
