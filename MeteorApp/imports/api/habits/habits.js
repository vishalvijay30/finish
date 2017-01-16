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
	'removeHabit': function(habit1) {
		habit = habit1.habit;
		Habits.remove({_id: habit._id});
	},
	'updateStreak': function(habit1) {
		habit = habit1.habit;
		//expect habit to have {habitId, integer, title: String, streak: int}
		d = new Date()
		Habits.update({_id: habit._id}, {$inc: {streak: 1}, $set: {completed: true, last_time: d.getTime()}});
		if (habit.streak > habit.max) {
			Meteor.call('updateMax', habit1);
		}
	},
	'resetStreak': function(habit1) {
		habit = habit1.habit;
		Habits.update({_id: habit._id}, {$set: {streak: 0}});
	},
	'updateMax': function(habit1) {
		habit1 = habit.habit;
		Habits.update({_id: habit._id}, {$set: {max: habit.streak}})
	},
	'refreshList': function(habit_list) {
		d = new Date()
		for (i=0; i < len(habit_list); i++) {
			if ((d.getTime() - habit_list[i].last_time)/(1000*60*60*24) > 1) {
				Habits.resetStreak(habit_list[i])
			}
		}
	}
});

if (Meteor.isServer){
	Meteor.publish('habits', function habitsPublication() {
		return Habits.find({userId: this.userId});
	});
}