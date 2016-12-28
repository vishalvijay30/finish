import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

Habits = new Mongo.Collection('habits');

Meteor.methods({
	'addHabit': function(habit){
		//expect habit to have {habitId: integer, title: String, streak: 0}
		var currentUserId = Meteor.userId();
		Habits = new Mongo.Collection(currentUserId+"");
		Habits.insert({userId: currentUserId, habitId: habit.habitId, title: habit.title, streak: habit.streak});
        console.log(Habits.find().fetch());
	},
	'removeHabit': function(habit) {
		Habits.remove({habitId: habit.habitId});
	},
	'updateStreak': function(habit) {
		//expect habit to have {habitId, integer, title: String, streak: int}
		Habits.update({habitId: habit.habitId}, {$inc: {streak: 1}});	
	}
});

Meteor.publish('habits', function habitsPublication() {
			var currentUserId = Meteor.userId();
			return Habits.find({userId: this.userId()}).fetch();
});