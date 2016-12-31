import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

Habits = new Mongo.Collection('habits');

Meteor.methods({
	'addHabit': function(habit){
		//expect habit to have {habitId: integer, title: String, streak: 0}
		var currentUserId = Meteor.userId();
		console.log("we made it");
		Habits.insert({userId: currentUserId, habitId: habit.habitId, title: habit.title, streak: habit.streak});
        console.log(Habits.find().fetch());
		return "success";
	},
	'removeHabit': function(habit) {
		Habits.remove({habitId: habit.habitId});
	},
	'updateStreak': function(habit) {
		//expect habit to have {habitId, integer, title: String, streak: int}
		Habits.update({habitId: habit.habitId}, {$inc: {streak: 1}});	
	}
});

if (Meteor.isServer){
	Meteor.publish('habits', function habitsPublication() {
		return Habits.find({userId: this.userId});
	});
}