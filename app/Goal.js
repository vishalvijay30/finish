// JavaScript File
var currentGoalsList = []; /* stores a list of current goals
						scope is global...might be a security issue*/

var archivedGoalsList = [];

//constructor initializes Goal object with a name attribute and a time attribute (in days)
function Goal(name, time){
	this.name = name;
	this.time = time;
	addGoal(this);
}

//maintains a current list of goals created by the user
function addGoal(aGoal){
	currentGoalsList.push(aGoal);
}

//function corresponds to the current goals radio button function on the UI design
Goal.prototype.getCurrentGoalsList = function(){
	return currentGoalsList;
};

//function allows archiving of goals
Goal.prototype.archive = function(aGoal){
	archivedGoalsList.push(aGoal);
	currentGoalsList=currentGoalsList.filter(function(val){
		return !(equals(val,aGoal));
	});
};

//defining equality differently
function equals(goal1, goal2){
	if(goal1.name === goal2.name && goal1.time === goal2.time){
		return true;
	}
	return false;
}

Goal.prototype.getArchivedGoalsList = function(){
	return archivedGoalsList;
};

/* the user can't delete a goal once it is set;
this function is meant to be used after the goal has been completed*/
//Also, this is meant to be used if the user does not wish to archive the completed goal
Goal.prototype.remove = function(aGoal){
	currentGoalsList = currentGoalsList.filter(function(val){
		return !(equals(val,aGoal));
	});
};