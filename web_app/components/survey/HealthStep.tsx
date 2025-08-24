// web_app/components/survey/HealthStep.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface HealthStepProps {
  data: any;
  setData: (data: any) => void;
}

const HealthStep: React.FC<HealthStepProps> = ({ data, setData }) => {
  const updateHealthData = (field: string, value: any) => {
    setData({
      ...data,
      health: {
        ...data.health,
        [field]: value
      }
    });
  };

  const medicalConditions = [
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Asthma',
    'Depression',
    'Anxiety',
    'Arthritis',
    'Cancer',
    'Thyroid Disorder',
    'Obesity',
    'None'
  ];

  const medications = [
    'Blood Pressure Medication',
    'Diabetes Medication',
    'Antidepressants',
    'Pain Relievers',
    'Vitamins/Supplements',
    'None'
  ];

  const exerciseTypes = [
    'Walking',
    'Running',
    'Cycling',
    'Swimming',
    'Gym/Weight Training',
    'Yoga',
    'Pilates',
    'Dancing',
    'Sports',
    'None'
  ];

  const dietTypes = [
    'Vegetarian',
    'Vegan',
    'Non-vegetarian',
    'Keto',
    'Paleo',
    'Mediterranean',
    'Low-carb',
    'No specific diet'
  ];

  const stressLevels = [
    'Very Low',
    'Low',
    'Moderate',
    'High',
    'Very High'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Health Information</h2>
        <p className="text-gray-300">Help us understand your health profile</p>
      </div>

      {/* Basic Information */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="dateOfBirth" className="text-white">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={data.health?.dateOfBirth || ''}
                onChange={(e) => updateHealthData('dateOfBirth', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-white">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={data.health?.height || ''}
                onChange={(e) => updateHealthData('height', parseFloat(e.target.value) || 0)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="weight" className="text-white">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={data.health?.weight || ''}
                onChange={(e) => updateHealthData('weight', parseFloat(e.target.value) || 0)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical History */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Medical History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Medical Conditions (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {medicalConditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={data.health?.medicalConditions?.includes(condition) || false}
                    onCheckedChange={(checked) => {
                      const currentConditions = data.health?.medicalConditions || [];
                      const newConditions = checked
                        ? [...currentConditions, condition]
                        : currentConditions.filter((c: string) => c !== condition);
                      updateHealthData('medicalConditions', newConditions);
                    }}
                  />
                  <Label htmlFor={condition} className="text-white text-sm">{condition}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="medicalHistoryDetails" className="text-white">Medical History Details</Label>
            <Textarea
              id="medicalHistoryDetails"
              placeholder="Please provide details about any medical conditions, surgeries, or health events (date/year, cause, treatment)"
              value={data.health?.medicalHistoryDetails || ''}
              onChange={(e) => updateHealthData('medicalHistoryDetails', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Medications */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Current Medications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Medications (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {medications.map((medication) => (
                <div key={medication} className="flex items-center space-x-2">
                  <Checkbox
                    id={medication}
                    checked={data.health?.currentMedications?.includes(medication) || false}
                    onCheckedChange={(checked) => {
                      const currentMeds = data.health?.currentMedications || [];
                      const newMeds = checked
                        ? [...currentMeds, medication]
                        : currentMeds.filter((m: string) => m !== medication);
                      updateHealthData('currentMedications', newMeds);
                    }}
                  />
                  <Label htmlFor={medication} className="text-white text-sm">{medication}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="medicationDetails" className="text-white">Medication Details</Label>
            <Textarea
              id="medicationDetails"
              placeholder="Please list any other medications, dosages, and how long you've been taking them"
              value={data.health?.medicationDetails || ''}
              onChange={(e) => updateHealthData('medicationDetails', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Exercise & Physical Activity */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Exercise & Physical Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exerciseFrequency" className="text-white">Exercise Frequency (days/week)</Label>
              <Select
                value={data.health?.exerciseFrequency?.toString() || ''}
                onValueChange={(value) => updateHealthData('exerciseFrequency', parseInt(value))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((days) => (
                    <SelectItem key={days} value={days.toString()} className="text-white">
                      {days} {days === 1 ? 'day' : 'days'} per week
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="exerciseDuration" className="text-white">Exercise Duration (minutes/session)</Label>
              <Select
                value={data.health?.exerciseDuration?.toString() || ''}
                onValueChange={(value) => updateHealthData('exerciseDuration', parseInt(value))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {[15, 30, 45, 60, 90, 120].map((minutes) => (
                    <SelectItem key={minutes} value={minutes.toString()} className="text-white">
                      {minutes} minutes
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-white">Types of Exercise (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {exerciseTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={data.health?.exerciseTypes?.includes(type) || false}
                    onCheckedChange={(checked) => {
                      const currentTypes = data.health?.exerciseTypes || [];
                      const newTypes = checked
                        ? [...currentTypes, type]
                        : currentTypes.filter((t: string) => t !== type);
                      updateHealthData('exerciseTypes', newTypes);
                    }}
                  />
                  <Label htmlFor={type} className="text-white text-sm">{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diet & Nutrition */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Diet & Nutrition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dietType" className="text-white">Diet Type</Label>
              <Select
                value={data.health?.dietType || ''}
                onValueChange={(value) => updateHealthData('dietType', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {dietTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mealsPerDay" className="text-white">Meals per Day</Label>
              <Select
                value={data.health?.mealsPerDay?.toString() || ''}
                onValueChange={(value) => updateHealthData('mealsPerDay', parseInt(value))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select meals" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {[1, 2, 3, 4, 5, 6].map((meals) => (
                    <SelectItem key={meals} value={meals.toString()} className="text-white">
                      {meals} {meals === 1 ? 'meal' : 'meals'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="dietaryRestrictions" className="text-white">Dietary Restrictions or Allergies</Label>
            <Textarea
              id="dietaryRestrictions"
              placeholder="e.g., Gluten-free, lactose intolerant, nut allergies, etc."
              value={data.health?.dietaryRestrictions || ''}
              onChange={(e) => updateHealthData('dietaryRestrictions', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sleep & Stress */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Sleep & Stress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sleepHours" className="text-white">Sleep Hours per Night</Label>
              <Select
                value={data.health?.sleepHours?.toString() || ''}
                onValueChange={(value) => updateHealthData('sleepHours', parseFloat(value))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((hours) => (
                    <SelectItem key={hours} value={hours.toString()} className="text-white">
                      {hours} {hours === 1 ? 'hour' : 'hours'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="stressLevel" className="text-white">Stress Level</Label>
              <Select
                value={data.health?.stressLevel || ''}
                onValueChange={(value) => updateHealthData('stressLevel', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select stress level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {stressLevels.map((level) => (
                    <SelectItem key={level} value={level} className="text-white">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="sleepQuality" className="text-white">Sleep Quality</Label>
            <Select
              value={data.health?.sleepQuality || ''}
              onValueChange={(value) => updateHealthData('sleepQuality', value)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select sleep quality" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="excellent" className="text-white">Excellent</SelectItem>
                <SelectItem value="good" className="text-white">Good</SelectItem>
                <SelectItem value="fair" className="text-white">Fair</SelectItem>
                <SelectItem value="poor" className="text-white">Poor</SelectItem>
                <SelectItem value="very_poor" className="text-white">Very Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Family History */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Family History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="familyHistory" className="text-white">Family Medical History</Label>
            <Textarea
              id="familyHistory"
              placeholder="Please mention any medical conditions that run in your family (parents, siblings, grandparents)"
              value={data.health?.familyHistory || ''}
              onChange={(e) => updateHealthData('familyHistory', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthStep;