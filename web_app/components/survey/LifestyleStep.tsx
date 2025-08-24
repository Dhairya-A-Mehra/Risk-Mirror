// web_app/components/survey/LifestyleStep.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface LifestyleStepProps {
  data: any;
  setData: (data: any) => void;
}

const LifestyleStep: React.FC<LifestyleStepProps> = ({ data, setData }) => {
  const updateLifestyleData = (field: string, value: any) => {
    setData({
      ...data,
      lifestyle: {
        ...data.lifestyle,
        [field]: value
      }
    });
  };

  const maritalStatuses = [
    'Single',
    'Married',
    'Divorced',
    'Widowed',
    'In a Relationship',
    'Separated'
  ];

  const workLifeBalanceTypes = [
    'Excellent - Perfect balance',
    'Good - Mostly balanced',
    'Fair - Some imbalance',
    'Poor - Often overwhelmed',
    'Very Poor - Constant stress'
  ];

  const socialFrequencies = [
    'Daily',
    '2-3 times per week',
    'Weekly',
    'Bi-weekly',
    'Monthly',
    'Rarely',
    'Never'
  ];

  const hobbies = [
    'Reading',
    'Gaming',
    'Sports',
    'Music',
    'Cooking',
    'Travel',
    'Photography',
    'Art/Craft',
    'Gardening',
    'Fitness',
    'Dancing',
    'Writing',
    'Technology',
    'Collecting',
    'Volunteering',
    'Other'
  ];

  const techUsage = [
    'Very Low - Minimal screen time',
    'Low - 1-2 hours daily',
    'Moderate - 3-5 hours daily',
    'High - 6-8 hours daily',
    'Very High - 8+ hours daily'
  ];

  const commuteTypes = [
    'Walking',
    'Cycling',
    'Public Transport',
    'Personal Vehicle',
    'Work from Home',
    'Carpool',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Lifestyle Information</h2>
        <p className="text-gray-300">Help us understand your daily life and habits</p>
      </div>

      {/* Personal & Family */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Personal & Family</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maritalStatus" className="text-white">Marital Status</Label>
              <Select
                value={data.lifestyle?.maritalStatus || ''}
                onValueChange={(value) => updateLifestyleData('maritalStatus', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {maritalStatuses.map((status) => (
                    <SelectItem key={status} value={status} className="text-white">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="numberOfChildren" className="text-white">Number of Children</Label>
              <Select
                value={data.lifestyle?.numberOfChildren?.toString() || ''}
                onValueChange={(value) => updateLifestyleData('numberOfChildren', parseInt(value))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()} className="text-white">
                      {num} {num === 1 ? 'child' : 'children'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="familyRelations" className="text-white">Family Relations</Label>
            <Textarea
              id="familyRelations"
              placeholder="Describe your relationship with family members (parents, siblings, spouse, children)"
              value={data.lifestyle?.familyRelations || ''}
              onChange={(e) => updateLifestyleData('familyRelations', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Work & Career */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Work & Career</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workHours" className="text-white">Work Hours per Week</Label>
              <Select
                value={data.lifestyle?.workHours?.toString() || ''}
                onValueChange={(value) => updateLifestyleData('workHours', parseInt(value))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80].map((hours) => (
                    <SelectItem key={hours} value={hours.toString()} className="text-white">
                      {hours} hours
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="workLifeBalance" className="text-white">Work-Life Balance</Label>
              <Select
                value={data.lifestyle?.workLifeBalance || ''}
                onValueChange={(value) => updateLifestyleData('workLifeBalance', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select balance" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {workLifeBalanceTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="commuteType" className="text-white">Commute Type</Label>
            <Select
              value={data.lifestyle?.commuteType || ''}
              onValueChange={(value) => updateLifestyleData('commuteType', value)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select commute type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {commuteTypes.map((type) => (
                  <SelectItem key={type} value={type} className="text-white">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="commuteTime" className="text-white">Commute Time (minutes each way)</Label>
            <Input
              id="commuteTime"
              type="number"
              placeholder="30"
              value={data.lifestyle?.commuteTime || ''}
              onChange={(e) => updateLifestyleData('commuteTime', parseFloat(e.target.value) || 0)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Life */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Social Life</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="socialFrequency" className="text-white">Social Activity Frequency</Label>
              <Select
                value={data.lifestyle?.socialFrequency || ''}
                onValueChange={(value) => updateLifestyleData('socialFrequency', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {socialFrequencies.map((frequency) => (
                    <SelectItem key={frequency} value={frequency} className="text-white">
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="closeFriends" className="text-white">Number of Close Friends</Label>
              <Select
                value={data.lifestyle?.closeFriends?.toString() || ''}
                onValueChange={(value) => updateLifestyleData('closeFriends', parseInt(value))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()} className="text-white">
                      {num} {num === 1 ? 'friend' : 'friends'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="socialActivities" className="text-white">Preferred Social Activities</Label>
            <Textarea
              id="socialActivities"
              placeholder="e.g., Dinner with friends, movie nights, sports activities, parties, etc."
              value={data.lifestyle?.socialActivities || ''}
              onChange={(e) => updateLifestyleData('socialActivities', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Daily Routine */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Daily Routine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="wakeUpTime" className="text-white">Typical Wake-up Time</Label>
              <Input
                id="wakeUpTime"
                type="time"
                value={data.lifestyle?.wakeUpTime || ''}
                onChange={(e) => updateLifestyleData('wakeUpTime', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="bedTime" className="text-white">Typical Bed Time</Label>
              <Input
                id="bedTime"
                type="time"
                value={data.lifestyle?.bedTime || ''}
                onChange={(e) => updateLifestyleData('bedTime', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dailyRoutine" className="text-white">Daily Routine Description</Label>
            <Textarea
              id="dailyRoutine"
              placeholder="Describe your typical daily routine (work, meals, activities, etc.)"
              value={data.lifestyle?.dailyRoutine || ''}
              onChange={(e) => updateLifestyleData('dailyRoutine', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Hobbies & Interests */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Hobbies & Interests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Hobbies (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {hobbies.map((hobby) => (
                <div key={hobby} className="flex items-center space-x-2">
                  <Checkbox
                    id={hobby}
                    checked={data.lifestyle?.hobbies?.includes(hobby) || false}
                    onCheckedChange={(checked) => {
                      const currentHobbies = data.lifestyle?.hobbies || [];
                      const newHobbies = checked
                        ? [...currentHobbies, hobby]
                        : currentHobbies.filter((h: string) => h !== hobby);
                      updateLifestyleData('hobbies', newHobbies);
                    }}
                  />
                  <Label htmlFor={hobby} className="text-white text-sm">{hobby}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="otherHobbies" className="text-white">Other Hobbies or Interests</Label>
            <Textarea
              id="otherHobbies"
              placeholder="Any other hobbies or interests not listed above"
              value={data.lifestyle?.otherHobbies || ''}
              onChange={(e) => updateLifestyleData('otherHobbies', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Technology Usage */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Technology Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="techUsage" className="text-white">Daily Technology Usage</Label>
            <Select
              value={data.lifestyle?.techUsage || ''}
              onValueChange={(value) => updateLifestyleData('techUsage', value)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select usage level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {techUsage.map((usage) => (
                  <SelectItem key={usage} value={usage} className="text-white">
                    {usage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="socialMediaUsage" className="text-white">Social Media Usage (hours/day)</Label>
            <Select
              value={data.lifestyle?.socialMediaUsage?.toString() || ''}
              onValueChange={(value) => updateLifestyleData('socialMediaUsage', parseFloat(value))}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select hours" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {[0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8].map((hours) => (
                  <SelectItem key={hours} value={hours.toString()} className="text-white">
                    {hours} {hours === 1 ? 'hour' : 'hours'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="preferredDevices" className="text-white">Preferred Devices</Label>
            <Textarea
              id="preferredDevices"
              placeholder="e.g., Smartphone, laptop, tablet, desktop, smartwatch, etc."
              value={data.lifestyle?.preferredDevices || ''}
              onChange={(e) => updateLifestyleData('preferredDevices', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Life Goals */}
      <Card className="bg-gray-800/50 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Life Goals & Aspirations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="shortTermGoals" className="text-white">Short-term Goals (next 6 months)</Label>
            <Textarea
              id="shortTermGoals"
              placeholder="What do you want to achieve in the next 6 months?"
              value={data.lifestyle?.shortTermGoals || ''}
              onChange={(e) => updateLifestyleData('shortTermGoals', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="longTermGoals" className="text-white">Long-term Goals (next 5 years)</Label>
            <Textarea
              id="longTermGoals"
              placeholder="What are your major life goals for the next 5 years?"
              value={data.lifestyle?.longTermGoals || ''}
              onChange={(e) => updateLifestyleData('longTermGoals', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifestyleStep;