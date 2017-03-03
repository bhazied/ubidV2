<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Patient;
use ContinuousNet\BiodyXpertBundle\Form\PatientType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Patient Controller
 * 
 * Manage Patients 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		PatientController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/patient")
 */
class PatientController extends BaseController
{
	/**
	 * Lists all Patient entities.
	 *
	 * @Route("/", name="patient_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$patients = $em->getRepository('BiodyXpertBundle:Patient')->findAll();

		return $this->render('BiodyXpertBundle:Patient:index.html.twig', array(
			'patients' => $patients,
		));
	}

	/**
	 * Creates a new Patient entity.
	 *
	 * @Route("/new", name="patient_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$patient = new Patient();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\PatientType', $patient);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($patient);
			$em->flush();

			return $this->redirectToRoute('patient_show', array('id' => $patient->getId()));
		}

		return $this->render('BiodyXpertBundle:Patient:new.html.twig', array(
			'patient' => $patient,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Patient entity.
	 *
	 * @Route("/{id}", name="patient_show")
	 * @Method("GET")
	 */
	public function showAction(Patient $patient)
	{
		$deleteForm = $this->createDeleteForm($patient);

		return $this->render('BiodyXpertBundle:Patient:show.html.twig', array(
			'patient' => $patient,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Patient entity.
	 *
	 * @Route("/{id}/edit", name="patient_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Patient $patient)
	{
		$deleteForm = $this->createDeleteForm($patient);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\PatientType', $patient);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($patient);
			$em->flush();

			return $this->redirectToRoute('patient_edit', array('id' => $patient->getId()));
		}

		return $this->render('BiodyXpertBundle:Patient:edit.html.twig', array(
			'patient' => $patient,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Patient entity.
	 *
	 * @Route("/{id}", name="patient_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Patient $patient)
	{
		$form = $this->createDeleteForm($patient);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($patient);
			$em->flush();
		}

		return $this->redirectToRoute('patient_index');
	}

	/**
	 * Creates a form to delete a Patient entity.
	 *
	 * @param Patient $patient The Patient entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Patient $patient)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('patient_delete', array('id' => $patient->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
