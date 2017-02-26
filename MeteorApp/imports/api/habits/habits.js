import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

Habits = new Mongo.Collection('habits');

Meteor.methods({
	'addHabit': function(habit){
		//expect habit to have {habitId: integer, title: String, streak: 0}
		d = new Date()
		Habits.insert({userId: habit.userId, title: habit.title, streak: 0, max: 0, completed: false});
		//return "success";
		return Habits.find().fetch();
	},
	'removeHabit': function(habit) {
		habit = habit.habit;
		Habits.remove({_id: habit._id});
	},
	'updateStreak': function(habit) {
		console.log("update streak");
		habit = habit.habit;
		//expect habit to have {habitId, integer, title: String, streak: int}
		Habits.update({_id: habit._id}, {$inc: {streak: 1}, $set: {completed: true}});
		habit.streak = habit.streak+1;

		if (habit.streak > habit.max) {
			Habits.update({_id: habit._id}, {$set: {max: habit.streak}});
			console.log(Habits.find({_id: habit._id}).fetch());
		}
	}
});

SyncedCron.add({
  name: 'Crunch some important numbers for the marketing department',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.recur().on('00:15:00').time();
  },
  job: function refreshList() {
			console.log("refresh list called");
			habit_list = Habits.find().fetch();
			for (i=0; i < habit_list.length; i++) {
				if (habit_list[i].completed == false) {
					Habits.update({_id: habit_list[i]._id}, {$set: {streak: 0}});
				} else {
					Habits.update({_id: habit_list[i]._id}, {$set: {completed: false}});
				}
			}
		}
});

if (Meteor.isServer){
	Habits.remove({userId: null});
	Meteor.publish('habits', function habitsPublication() {
		//console.log(Habits.find({userId: this.userId}).fetch());
		return Habits.find({userId: this.userId});
	});
}
